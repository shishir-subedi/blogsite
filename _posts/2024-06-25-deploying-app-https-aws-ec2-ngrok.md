---
layout: page
image_path: /static/img/blogs/blog/deploying-app-https-aws-ngrok.svg
title: "Deploying an App with HTTPs on an EC2 Instance using Ngrok"
permalink: "/blogs/deploying-app-https-aws-ec2-ngrok/"
# next_post: ""
previous_post: "/blogs/document-qa-harnessing-the-power-of-bedrock-claude-v2-llm-and-pinecone-vector-database/"
created: 2024-06-28 9:03:00 +0545
updated: 2024-06-29 12:02:00 +0545
description: "In this blog post you will learn how to deploy an app with HTTPs on an AWS EC2 instance using Ngrok. This cost-effective solution leverages Ngrok's secure tunneling to provide HTTPs without the need for a domain name or load balancer."
categories: AWS, EC2, Ngrok, HTTPs, Tunneling
published: true
tags: AWS EC2 Ngrok Tunneling FastAPI
hitscount: "https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fshishirsubedi.com%2F%2Fblogs%2Fdeploying-app-https-aws-ec2-ngrok%2F&count_bg=%232E3439&title_bg=%23FF0000&icon=&icon_color=%23E7E7E7&title=Visited&edge_flat=false"
---

<br/>

### Problem Statement

Deploying an application like voice translation can be a daunting task, especially when HTTPs is a requirement for the voice feature to work. Recently, I faced a similar challenge with my demo project which I have to deploy on an EC2 instance with HTTPs. I couldn't afford to buy a domain name just for this demo project or a load balancer, and also Certbot was blocking AWS IPs. 

I remembered my previous experience with [Ngrok](https://ngrok.com/){:target="_blank"} during local backend development, where I used it to expose backend endpoints via HTTPs for sharing with frontend developers. An idea popped into my mind: what if I could run my application on an EC2 instance and use Ngrok in the background? After testing this setup, I’m excited to share it with you.

Ngrok also provides a free sub-domain, which is important as Ngrok generates a random URL every time it is restarted.

Here's how you can do it too!
<br/>
<br/>

### Prerequisites

Before we dive in, you should be familiar with provisioning an EC2 instance in AWS. If not, AWS has excellent documentation to get you started. Here is the brief overview

<br/>

### Setting Up the EC2 Instance

**Provision an EC2 Instance:**
   - Select Ubuntu as the AMI.
   - Leave all other settings as default.
   - Go to the EC2 instance dashboard and select the newly created instance.
   - Click the "Connect" button.
   - On the EC2 Instance Connect tab, scroll down and click "Connect" to start remote connection

<br/>

**Install Packages for Deployment:**
   Once connected, run the following commands to set up your environment:

   ```bash
   sudo apt-get update
   sudo apt-get upgrade -y
   sudo apt-get install python3 python3-venv python3-pip -y
   ```
<br/>

**Set Up your Application:**
   ```bash
   mkdir app
   cd app
   python3 -m venv .venv
   source .venv/bin/activate
   pip install fastapi
   nano main.py
   ```

   Copy and paste FastAPI application code into `main.py`. Below is the code

   ```python
   from fastapi import FastAPI, Request
   from starlette.middleware.cors import CORSMiddleware
   from fastapi.responses import HTMLResponse
   from fastapi.templating import Jinja2Templates

   app = FastAPI()

   app.add_middleware(
      CORSMiddleware,
      allow_origins=['*'],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
   )

   templates = Jinja2Templates(directory="templates")

   students = [
      {"name": "Alice", "score": 95},
      {"name": "Bob", "score": 90},
      {"name": "Charlie", "score": 85},
      {"name": "David", "score": 80},
      {"name": "Eva", "score": 75}
   ]

   @app.get("/", response_class=HTMLResponse)
   async def read_item(request: Request):
      return templates.TemplateResponse("index.html", {"request": request, "students": students})
   ```
   <br/>
   Code is simple, we have some students with name and score we just want to display them into that Ngrok sub-domain url.

<br/>

**Create HTML template**
   ```bash
   mkdir templates
   nano templates/index.html
   ```
   Copy and paste `index.html` content into this file.

   ```html
   <!DOCTYPE html>
   <html>

   <head>
      <title>Fastapi App</title>
      <!-- Bootstrap 5 CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
         integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
   </head>

   <body>
      <div class="container">
         <div class="row">
               <div class="offset-md-3 col-md-6">
                  <h2 class="my-4 text-center">Top 5 Students in Final Exam</h2>
                  <table class="table table-striped table-bordered">
                     <thead class="thead-dark">
                           <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Score</th>
                           </tr>
                     </thead>
                     <tbody>
                           {% for student in students %}
                           <tr>
                              <td>{{ student.name }}</td>
                              <td>{{ student.score }}</td>
                           </tr>
                           {% endfor %}
                     </tbody>
                  </table>
               </div>
         </div>
      </div>
      <!-- Bootstrap 5 JS and Popper.js -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
         integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
         crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
   </body>

   </html>
   ```

<br/>

**Install and Configure Authbind:**
   Authbind allows non-root users to bind to ports below 1024 (like port 80).

   ```bash
   sudo apt-get install authbind
   sudo touch /etc/authbind/byport/80
   sudo chown $USER /etc/authbind/byport/80
   sudo chmod 755 /etc/authbind/byport/80
   ```

<br/>

**Run the Application in Daemon Mode with Supervisor:**
   ```bash
   sudo apt-get install supervisor -y
   sudo nano /etc/supervisor/conf.d/app.conf
   ```

   Add the following configuration:

   ```bash
   [program:app]
   command=authbind --deep /home/ubuntu/app/.venv/bin/uvicorn main:app --host 0.0.0.0 --port 80
   directory=/home/ubuntu/app
   user=ubuntu
   autostart=true
   autorestart=true
   stderr_logfile=/var/log/app.log
   ```

   Reload and start Supervisor:

   ```bash
   sudo supervisorctl reread
   sudo supervisorctl update
   sudo supervisorctl restart app
   tail -f /var/log/app.log
   ```

   Now, if you copy the public IP of your EC2 instance and visit `http://<ip-address>`, you should see your site running in HTTP mode.

<br/>

### Setting Up Ngrok

Ngrok is a powerful tool that creates a secure tunnel to your local server, making it accessible over the internet. This is perfect for situations where you need HTTPs but don't want to purchase a domain name or set up a load balancer.

<br/>

**Install Ngrok:**
   Sign up on [Ngrok](https://dashboard.ngrok.com/signup){:target="_blank"} and get your auth token. Then run the following commands in your EC2 instance terminal:

   ```bash
   curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
   	| sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
   	&& echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
   	| sudo tee /etc/apt/sources.list.d/ngrok.list \
   	&& sudo apt update \
   	&& sudo apt install ngrok
   ```

   Authenticate Ngrok with your token:
   
   `ngrok config add-authtoken <your-ngrok-auth-token>`

   Get you Ngrok sub-domain from [here](https://dashboard.ngrok.com/cloud-edge/domains){:target="_blank"}.

<br/>

**Run Ngrok in the Background:**

Run below command in the EC2 terminal.

```bash
nohup ngrok http --domain=<your-ngrok-subdomain>.ngrok-free.app 80 > ngrok.log &

```

Replace `<your-ngrok-subdomain>` with your desired subdomain. Ngrok will now create an HTTPS tunnel to your EC2 instance.

And there you have it! Your app should now be accessible over HTTPs using the Ngrok sub-domain URL.

<br/>

### Summary

By using Ngrok, we can easily set up a secure HTTPs connection for our application without the need for a domain name or a load balancer. This solution is cost-effective and perfect for demo projects or development environments. With the steps outlined above, you should be able to deploy your app on an EC2 instance and make it accessible over HTTPs.