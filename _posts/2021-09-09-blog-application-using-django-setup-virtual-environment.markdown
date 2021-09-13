---
layout: page
image_path: /static/img/blogs/blog/building-blog-application-django-setup-project-virtual-environment.png
title:  "Building a blog application with django | Download the blog template also setup virtual environment and django project"
permalink: "/blogs/building-blog-application-django-setup-project-virtual-environment/"
#next_post: ""
previous_post: "/blogs/tic-tac-toe-python/"
created: 2021-09-09 15:33:00 +0545
description: "In this first part of building blog application with django, we are going download the free blog template and setup the virtual environment to install django and to create django blog project."
categories: Django Blog
published: true
tags: Django Blog Vritual-Environment Project-Setup
hitscount: "https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fshishirsubedi.com%2Fblogs%2Fbuilding-blog-application-django-setup-project-virtual-environment%2F&count_bg=%232E3439&title_bg=%23FF0000&icon=&icon_color=%23E7E7E7&title=Visited&edge_flat=false"
---

This is the fisrt part of the series "Building a blog application with django". In this section, we first download a blog template that we are using in this series from the [Link](https://bootstrapious.com/p/bootstrap-blog){:target="_blank"}. You need to provide email and firstname in order to obtain this template in your email.

Now make a new folder in the preferred directory in your computer e.g. Desktop. Make a folder django-blog and inside this directory we will setup our virtual environment and django project. The importance of making virtual environment is that you can seprate the project dependencies from the rest of local installed one so that we have only those dependencies that are required for the project and same dependencies can be installed on server at the time of deployment.

Virtual environment can be installed using pip. Here we will discuss how you can install virtual environment and create one based on your platform.

#### Installing the virtual environement

###### On Unix/MacOS
{% highlight bash %}
python3 -m pip install --user virtualenv
{% endhighlight %}

###### On Windows
{% highlight bash %}
py -m pip install --user virtualenv
{% endhighlight %}

#### Creating the virtual environment

###### On Unix/MacOS
{% highlight bash %}
python3 -m venv blogenv
{% endhighlight %}

###### On Windows
{% highlight bash %}
py -m venv blogenv
{% endhighlight %}

*Note: blogenv is our virtual environment name so you can use any name you like.*

#### Activating the virtual environement

###### On Unix/MacOS
{% raw %}
    source blogenv/bin/activate
{% endraw %}

###### On Windows
{% raw %}
    .\blogenv\Scripts\activate
{% endraw %}

After activating the virtual environment we install django version 3.2 by using following command.
{% highlight bash %}
pip install django==3.2
{% endhighlight %}

#### Create django project
We now create our blog project by running the following command 
{% highlight bash %}
django-admin startproject blogproject .
{% endhighlight %}

*Note: 'blogproject' is project name and '.' is the path where we want to place our project, in our case we want to place our project in the same path i.e. current folder. If we don't provide the path, django will make another folder inside of which contains our project. You can try by not providing the path for verification.*

To run django server, run the following command 'python manage.py runserver port'
{% highlight bash %}
python manage.py runserver 9000
{% endhighlight %}
*Note: 9000 is port number if you don't provide the port number django will run on port 8000 by default.*

If you go the url you will find django server up and running. Here completes the first part of the series "Building a blog application with django". In the following section we will configure our project settings and will create django apps user and blog. The user app will handle user authentication where as blog app will have logic of our blog post. 

*If you have any questions regarding this section, feel free to comment down below in the comment section. I will be happy to answer your questions.*