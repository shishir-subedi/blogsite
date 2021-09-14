---
layout: page
image_path: /static/img/blogs/blog/building-blog-application-django-configure-settings-create-apps-render-html-template-interaction-django-admin-panel.png
title:  "Building a blog application with django | Configure project settings, create apps and views to render simple html page"
permalink: "/blogs/building-blog-application-django-configure-settings-create-apps-render-html-template-interaction-django-admin-panel/"
next_post: "/blogs/building-blog-application-django-configure-static-media-settings-render-home-page-downloaded-template/"
previous_post: "/blogs/building-blog-application-django-setup-project-virtual-environment/"
created: 2021-09-14 14:28:00 +0545
description: "In this second part of building blog application with django, we are going configure project settings and create a simple index page to demonstrate how django will render the html files. Also we will create some apps with database table and interact them with django admin panel."
categories: Django Blog
published: true
tags: Django Blog Configure-Settings Render-Template
hitscount: "https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fshishirsubedi.com%2Fblogs%2Fbuilding-blog-application-django-configure-static-media-settings-render-home-page-downloaded-template%2F&count_bg=%232E3439&title_bg=%23FF0000&icon=&icon_color=%23E7E7E7&title=Visited&edge_flat=false"
---

This is the second part of the series "Building a blog application with django". In this section, we configure some settings parameter and create apps user, blog and core. The user app will contain the views and database models related to user authentication and user profile where as the blog app will contain views and database models related to our blog post and comment. The core app will contains general views (like views for rendering index page) and models which will be clear in the following sections.

##### Create django app
We create app by using command 'python manage.py startapp app_name'
{% highlight bash %}
python manage.py startapp user
python manage.py startapp blog
python manage.py startapp core
{% endhighlight %}

Lets open this project in the code editor of your choice. You can see the hierarchy of project structure.

{% highlight html %}
|django-blog
    |blog
        - __init__.py
        - admin.py
        - apps.py
        - models.py
        - tests.py
        - views.py
    |blogenv
    |blogproject
        - __init__.py
        - asgi.py
        - settings.py
        - urls.py
        - wsgi.py
    |core
    |user
    manage.py
{% endhighlight %}

Since we have created our apps, we have to register these created apps in project's settings.py. Open settings.py add our created apps in the INSTALLED_APPS sections as follow

{% highlight python %}
# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # user defined apps
    'core',
    'user',
    'blog',
]
{% endhighlight %}

Let's make a template folder in the current directory and inside there make a new file index.html and content as you like. So the project hierarchy can be seen like below

{% highlight html %}
|django-blog
    |blog
        - __init__.py
        - admin.py
        - apps.py
        - models.py
        - tests.py
        - views.py
    |blogenv
    |blogproject
        - __init__.py
        - asgi.py
        - settings.py
        - urls.py
        - wsgi.py
    |core
    |template
        - index.html
    |user
    manage.py
{% endhighlight %}

We have to tell django that the html files are placed here so in settings.py just below BASE_DIR add TEMPLATE_DIR = BASE_DIR / 'template'

{% highlight python %}
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATE_DIR = BASE_DIR / 'template'
{% endhighlight %}

And add this TEMPLATE_DIR in DIRS of TEMPLATES section. It then becomes 

{% highlight python %}
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATE_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
{% endhighlight %}

Change timezone as by commenting the default UTC to your preffered timezone. 
{% highlight python %}
# TIME_ZONE = 'UTC'
TIME_ZONE = 'Asia/Kathmandu'
{% endhighlight %}

In core/models.py add the following code

{% highlight python %}
from django.db import models

# Create your models here.

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    archived = models.BooleanField(default=False)

    class Meta:
        abstract = True
{% endhighlight %}

This is the abstract database table which fields are common in all database tables like User and Blog Post. The field created_at denotes when it is created, auto_now_add adds the current date at the time of entry automatically. The field updated_at denotes when that is updated date time is automatically picked at the time of update due to auto_now. The field archieved is a boolean field which denotes whether it is deleted or not. Normally once data is generated it is seldom deleted. Instead permanantely delete of the item we flag them as deleted/archieved. The abstract in class Meta insures that the database table is not created for it. It is used only for other database table to inherit those fields. 

So let's create a User database table which will inherit those fields. In user/models.py add the following code 

{% highlight python %}
from django.db import models
from django.contrib.auth.models import AbstractUser

from core.models import BaseModel

# Create your models here.

class User(AbstractUser, BaseModel):
    address = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    profile_pic = models.ImageField(
        upload_to='User/',
        blank=True,
        null=True
    )
{% endhighlight %}

We extends our User table form AbstractUser which consists default fields like (username, email, first_name, last_name etc.). So we add extra fields like address and profile_pic which are not in AbstractUser. The address field is a char field whose maximum length can be 255 characters and it can be null. The profile_pic is a Image field and when user upload his/her profile picture it will store in the folder User inside media folder. We will see this later.

Since we have used our custom user model we have to tell django to use this model as default user model. Add the following line anywhere in settings.py

{% highlight python %}
AUTH_USER_MODEL = 'user.User' # app.ModelName
{% endhighlight %}

Also create database tables for blog category and blog post. In blog/models.py add the following code 

{% highlight python %}
from django.db import models
from django.conf import settings

from core.models import BaseModel

# Create your models here.

class Category(BaseModel):
    title = models.CharField(
        max_length=64,
        unique=True
    )

class Post(BaseModel):
    class StatusChoices(models.IntegerChoices):
        DRAFT = 0,  'Not Published'
        PUBLISHED = 1,  'Published'
    
    title = models.CharField(
        max_length=255
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE
    )
    status = models.SmallIntegerField(
        choices=StatusChoices.choices,
        default=StatusChoices.DRAFT
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
{% endhighlight %}

Blog category table consists of field title which should be unique. The post table consists of fields title, category (relation to the category table - many to one relation), status (default is draft) and author related to the user. The on_delete in Foreign key denotes what will happen in case of parent deletion. CASCADE as the name suggested the post will be deleted when the parent category is deleted where as SET_NULL in author denotes that the author field in post is set to null if the corresponding author is deleted.

The makemigrations and migrate command are the two very important command in django. The 'makemigrations' command will detect any changes in the models and 'migrate' command will commit the changes to the database. So, lets detect changes in the app models by runnig makemigrations command. Syntax is 'python manage.py makemigrations app1 app2 ...'. The apps that have database changes to be detected.

{% highlight bash %}
python manage.py makemigrations user blog
{% endhighlight %}

*Note: We do not mention app 'core' because in the core models we only have base table. We don't need to create actual database table because of the abstract property. Also you will encounter an error saying 'user.User.profile_pic cannot use ImageField beacuse pillow is not installed' this is because image field use pillow library which is not installed. Simply install it by running command 'pip install pillow' and again run above makemigrations command.*

Makemigrations command will detect the models changes and create a migration scripts inside migrations folder. In order actually create database table we run command 

{% highlight bash %}
python manage.py migrate
{% endhighlight %}

The command 'createsuperuser' is used to create admin user so that we can login to the default admin panel provided by the django. When you run the command, you will be prompted with username, email, password and confirm password. Provide them to create admin user.

{% highlight bash %}
python manage.py createsuperuser
{% endhighlight %}

When you run the django server by running command 'python manage.py runserver' and go the localhost:8000/admin you are asked the admin username and password. After entering the correct admin username and password you can access the django admin panel.

In order to see our created models in admin we have to register them in the admin.py so, in user/admin.py add the following 

{% highlight python %}
from django.contrib import admin
from user.models import User

# Register your models here.

admin.site.register(User)
{% endhighlight %}

Also in blog/admin.py add the following code 

{% highlight python %}
from django.contrib import admin

from .models import Category, Post

# Register your models here.

admin.site.register(Category)
admin.site.register(Post)
{% endhighlight %}

After refreshing the admin page you will able to see them. Django will add 's to end of every model name. Users and Posts are fine but categorys, it's not cool so we add verbose_name_plural in Meta class of category as 

{% highlight python %}
class Category(BaseModel):
    title = models.CharField(
        max_length=64,
        unique=True
    )

    class Meta:
        verbose_name_plural = 'Categories'
{% endhighlight %}

Now if you refresh the page again we can see the Categories instead of Categorys. You can play around with this models. You can create/update/delete category and post.

Now lets create a simple view to render the index page. In core/views.py make a function which will simply render the index.html inside the template folder.

{% highlight python %}
from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'index.html')
{% endhighlight %}

Only defining the function will not work rather it should be mapped to url. So, create urls.py inside core app and add the following code.

{% highlight python %}
from django.urls import path

from .views import home

app_name = 'core'

urlpatterns = [
    path('', home, name='home'),
]
{% endhighlight %}

We have imported the home function from views.py and mapped it to the base url(i.e. localhost:8000/ or 127.0.0.1:8000/). We have given name to the url, the importance of giving name to the url is explained in the future sections. We also have to map app urls into project urls. In blogproject/urls.py add following code 

{% highlight python %}
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
]
{% endhighlight %}

For empty path i.e. base url (in local developement, localhost:8000/ and in production your domain) it will include the urls of core app. In the core app we only have one url pointing to the home view which eventually render index page from folder template.

*Now if you go to the home url you will find your index page rendered.*

So, in this section we installed apps, created database table for User and Post and also created a function to render a simple html page. In the next section, we will configure settings so that it can render the home page of the downloaded template. 

If you have any questions regarding this part, please comment down below in the comment section. See you in the next part.