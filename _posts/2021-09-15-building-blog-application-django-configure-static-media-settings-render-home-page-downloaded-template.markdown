---
layout: page
image_path: /static/img/blogs/blog/building-blog-application-django-configure-static-media-settings-render-home-page-downloaded-template.png
title: "Building a blog application with django | Configure static and media files settings, render home page of downloaded template"
permalink: "/blogs/building-blog-application-django-configure-static-media-settings-render-home-page-downloaded-template/"
next_post: "/blogs/sagemaker-pre-trained-model-deployment-terraform/"
previous_post: "/blogs/building-blog-application-django-configure-settings-create-apps-render-html-template-interaction-django-admin-panel/"
created: 2021-09-15 22:23:00 +0545
description: "In this third part of series - building blog application with django, we are going configure static and media settings so that it can render the static content and can store media files uploaded by user. By doing this so we can render the downloaded template's index page as it is."
categories: Django Blog
published: true
tags: Django Blog Static-Settings Media-Settings Render-Template
hitscount: "https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fshishirsubedi.com%2Fblogs%2Fbuilding-blog-application-django-configure-static-media-settings-render-home-page-downloaded-template%2F&count_bg=%232E3439&title_bg=%23FF0000&icon=&icon_color=%23E7E7E7&title=Visited&edge_flat=false"
---

This is the third part of the series, "Building a blog application with django". In this section, we will configure some settings parameter related to static and media files so that we can render downloaded template's index page as it is. By configuring media settings we can upload content without having issue. The main agenda of this section is, "how we can render html page which is rich in static content like css/img/js."

In the first part, we have downloaded the blog template from "bootstrapious". We move the static content from bootstrapious to our project. Make a folder 'static' in the same level as 'template'. Inside of which copy all the static contents from bootstrapious's template to our static folder. The hierarchy becomes


{% highlight html %}
|django-blog
    |blog
    |blogenv
    |blogproject
        - __init__.py
        - asgi.py
        - settings.py
        - urls.py
        - wsgi.py
    |core
    |static
        |css
        |fonts
        |icon-refrence
        |img
        |js
        |vendor
    |template
        - index.html
    |user
    manage.py
{% endhighlight %}

In our template/index.html remove previous content and replace with the bootstrapious's index.html content. Now we have to give the correct path of the static content. But first let's configure some settings parameter. In settings.py add the following code

{% highlight python %}
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticroot'
STATICFILES_DIRS = [
    BASE_DIR / "static",
    BASE_DIR / "staticroot",
]

# for media files i.e. uploaded content
MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = '/media/'

{% endhighlight %}

STATIC_URL and MEDIA_URL are simply url prefixes, STATICFILES_DIRS tells django where to search for the static files - in our case it is static folder and staticroot folder. Folder 'staticroot' will contain static files related to django admin panel which can be obtained by using command 'python manage.py collectstatic'. MEDIA_ROOT tells django that media folder will hold uploaded content.

We also have to change project url. Add the following code to project's urls.py

{% highlight python %}
from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

{% endhighlight %}

Django is not good in serving static and media content. That's why we have included django to server static and media content only in the development mode i.e. when DEBUG is on. In production, you may upload static content and media content to cloud services like AWS S3. You can also use nginx to filter out request i.e. allow django to serve only request that doesn't have /media/ or /static/ url prefixes.

In index.html, we have load a tag name 'static' which will give correct path to the static. Then we replace the path of static content based on the tag name 'static'. Replace all href and src attributes with static tag. After replacing, final index becomes the following

{% highlight jinja %}
{% raw  %}
{% load static %}
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Bootstrap Blog - B4 Template by Bootstrap Temple</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="all,follow">
  <!-- Bootstrap CSS-->
  <link rel="stylesheet" href="{% static 'vendor/bootstrap/css/bootstrap.min.css' %}">
  <!-- Font Awesome CSS-->
  <link rel="stylesheet" href="{% static 'vendor/font-awesome/css/font-awesome.min.css' %}">
  <!-- Custom icon font-->
  <link rel="stylesheet" href="{% static 'css/fontastic.css' %}">
  <!-- Google fonts - Open Sans-->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
  <!-- Fancybox-->
  <link rel="stylesheet" href="{% static 'vendor/@fancyapps/fancybox/jquery.fancybox.min.css' %}">
  <!-- theme stylesheet-->
  <link rel="stylesheet" href="{% static 'css/style.default.css' %}" id="theme-stylesheet">
  <!-- Custom stylesheet - for your changes-->
  <link rel="stylesheet" href="{% static 'css/custom.css' %}">
</head>

<body>
  <header class="header">
    <!-- Main Navbar-->
    <nav class="navbar navbar-expand-lg">
      <div class="search-area">
        <div class="search-area-inner d-flex align-items-center justify-content-center">
          <div class="close-btn"><i class="icon-close"></i></div>
          <div class="row d-flex justify-content-center">
            <div class="col-md-8">
              <form action="#">
                <div class="form-group">
                  <input type="search" name="search" id="search" placeholder="What are you looking for?">
                  <button type="submit" class="submit"><i class="icon-search-1"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!-- Navbar Brand -->
        <div class="navbar-header d-flex align-items-center justify-content-between">
          <!-- Navbar Brand --><a href="index.html" class="navbar-brand">Bootstrap Blog</a>
          <!-- Toggle Button-->
          <button type="button" data-toggle="collapse" data-target="#navbarcollapse" aria-controls="navbarcollapse"
            aria-expanded="false" aria-label="Toggle navigation"
            class="navbar-toggler"><span></span><span></span><span></span></button>
        </div>
        <!-- Navbar Menu -->
        <div id="navbarcollapse" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"><a href="index.html" class="nav-link active ">Home</a>
            </li>
            <li class="nav-item"><a href="blog.html" class="nav-link ">Blog</a>
            </li>
            <li class="nav-item"><a href="post.html" class="nav-link ">Post</a>
            </li>
            <li class="nav-item"><a href="#" class="nav-link ">Contact</a>
            </li>
          </ul>
          <div class="navbar-text"><a href="#" class="search-btn"><i class="icon-search-1"></i></a></div>
          <ul class="langs navbar-text"><a href="#" class="active">EN</a><span> </span><a href="#">ES</a></ul>
        </div>
      </div>
    </nav>
  </header>
  <!-- Hero Section-->
  <section id="hero-section" class="hero">
    <div class="container">
      <div class="row">
        <div class="col-lg-7">
          <h1>Bootstrap 4 Blog - A free template by Bootstrap Temple</h1><a href="#" class="hero-link">Discover More</a>
        </div>
      </div><a href=".intro" class="continue link-scroll"><i class="fa fa-long-arrow-down"></i> Scroll Down</a>
    </div>
  </section>
  <!-- Intro Section-->
  <section class="intro">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <h2 class="h3">Some great intro here</h2>
          <p class="text-big">Place a nice <strong>introduction</strong> here <strong>to catch reader's
              attention</strong>. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderi.</p>
        </div>
      </div>
    </div>
  </section>
  <section class="featured-posts no-padding-top">
    <div class="container">
      <!-- Post-->
      <div class="row d-flex align-items-stretch">
        <div class="text col-lg-7">
          <div class="text-inner d-flex align-items-center">
            <div class="content">
              <header class="post-header">
                <div class="category"><a href="#">Business</a><a href="#">Technology</a></div><a href="post.html">
                  <h2 class="h4">Alberto Savoia Can Teach You About Interior</h2>
                </a>
              </header>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod
                tempor incididunt.</p>
              <footer class="post-footer d-flex align-items-center"><a href="#"
                  class="author d-flex align-items-center flex-wrap">
                  <div class="avatar"><img src="{% static 'img/avatar-1.jpg' %}" alt="..." class="img-fluid"></div>
                  <div class="title"><span>John Doe</span></div>
                </a>
                <div class="date"><i class="icon-clock"></i> 2 months ago</div>
                <div class="comments"><i class="icon-comment"></i>12</div>
              </footer>
            </div>
          </div>
        </div>
        <div class="image col-lg-5"><img src="{% static 'img/featured-pic-1.jpeg' %}" alt="..."></div>
      </div>
      <!-- Post        -->
      <div class="row d-flex align-items-stretch">
        <div class="image col-lg-5"><img src="{% static 'img/featured-pic-2.jpeg' %}" alt="..."></div>
        <div class="text col-lg-7">
          <div class="text-inner d-flex align-items-center">
            <div class="content">
              <header class="post-header">
                <div class="category"><a href="#">Business</a><a href="#">Technology</a></div><a href="post.html">
                  <h2 class="h4">Alberto Savoia Can Teach You About Interior</h2>
                </a>
              </header>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod
                tempor incididunt.</p>
              <footer class="post-footer d-flex align-items-center"><a href="#"
                  class="author d-flex align-items-center flex-wrap">
                  <div class="avatar"><img src="{% static 'img/avatar-2.jpg' %}" alt="..." class="img-fluid"></div>
                  <div class="title"><span>John Doe</span></div>
                </a>
                <div class="date"><i class="icon-clock"></i> 2 months ago</div>
                <div class="comments"><i class="icon-comment"></i>12</div>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <!-- Post                            -->
      <div class="row d-flex align-items-stretch">
        <div class="text col-lg-7">
          <div class="text-inner d-flex align-items-center">
            <div class="content">
              <header class="post-header">
                <div class="category"><a href="#">Business</a><a href="#">Technology</a></div><a href="post.html">
                  <h2 class="h4">Alberto Savoia Can Teach You About Interior</h2>
                </a>
              </header>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrude consectetur adipisicing elit, sed do eiusmod
                tempor incididunt.</p>
              <footer class="post-footer d-flex align-items-center"><a href="#"
                  class="author d-flex align-items-center flex-wrap">
                  <div class="avatar"><img src="{% static 'img/avatar-3.jpg' %}" alt="..." class="img-fluid"></div>
                  <div class="title"><span>John Doe</span></div>
                </a>
                <div class="date"><i class="icon-clock"></i> 2 months ago</div>
                <div class="comments"><i class="icon-comment"></i>12</div>
              </footer>
            </div>
          </div>
        </div>
        <div class="image col-lg-5"><img src="{% static 'img/featured-pic-3.jpeg' %}" alt="..."></div>
      </div>
    </div>
  </section>
  <!-- Divider Section-->
  <section id="divider-bg" class="divider">
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua</h2><a href="#" class="hero-link">View More</a>
        </div>
      </div>
    </div>
  </section>
  <!-- Latest Posts -->
  <section class="latest-posts">
    <div class="container">
      <header>
        <h2>Latest from the blog</h2>
        <p class="text-big">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </header>
      <div class="row">
        <div class="post col-md-4">
          <div class="post-thumbnail"><a href="post.html"><img src="{% static 'img/blog-1.jpg' %}" alt="..."
                class="img-fluid"></a></div>
          <div class="post-details">
            <div class="post-meta d-flex justify-content-between">
              <div class="date">20 May | 2016</div>
              <div class="category"><a href="#">Business</a></div>
            </div><a href="post.html">
              <h3 class="h4">Ways to remember your important ideas</h3>
            </a>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore.</p>
          </div>
        </div>
        <div class="post col-md-4">
          <div class="post-thumbnail"><a href="post.html"><img src="{% static 'img/blog-2.jpg' %}" alt="..."
                class="img-fluid"></a></div>
          <div class="post-details">
            <div class="post-meta d-flex justify-content-between">
              <div class="date">20 May | 2016</div>
              <div class="category"><a href="#">Technology</a></div>
            </div><a href="post.html">
              <h3 class="h4">Diversity in Engineering: Effect on Questions</h3>
            </a>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore.</p>
          </div>
        </div>
        <div class="post col-md-4">
          <div class="post-thumbnail"><a href="post.html"><img src="{% static 'img/blog-3.jpg' %}" alt="..."
                class="img-fluid"></a></div>
          <div class="post-details">
            <div class="post-meta d-flex justify-content-between">
              <div class="date">20 May | 2016</div>
              <div class="category"><a href="#">Financial</a></div>
            </div><a href="post.html">
              <h3 class="h4">Alberto Savoia Can Teach You About Interior</h3>
            </a>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Newsletter Section-->
  <section class="newsletter no-padding-top">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Subscribe to Newsletter</h2>
          <p class="text-big">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.</p>
        </div>
        <div class="col-md-8">
          <div class="form-holder">
            <form action="#">
              <div class="form-group">
                <input type="email" name="email" id="email" placeholder="Type your email address">
                <button type="submit" class="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Gallery Section-->
  <section class="gallery no-padding">
    <div class="row">
      <div class="mix col-lg-3 col-md-3 col-sm-6">
        <div class="item"><a href="img/gallery-1.jpg" data-fancybox="gallery" class="image"><img
              src="{% static 'img/gallery-1.jpg' %}" alt="..." class="img-fluid">
            <div class="overlay d-flex align-items-center justify-content-center"><i class="icon-search"></i></div>
          </a></div>
      </div>
      <div class="mix col-lg-3 col-md-3 col-sm-6">
        <div class="item"><a href="img/gallery-2.jpg" data-fancybox="gallery" class="image"><img
              src="{% static 'img/gallery-2.jpg' %}" alt="..." class="img-fluid">
            <div class="overlay d-flex align-items-center justify-content-center"><i class="icon-search"></i></div>
          </a></div>
      </div>
      <div class="mix col-lg-3 col-md-3 col-sm-6">
        <div class="item"><a href="img/gallery-3.jpg" data-fancybox="gallery" class="image"><img
              src="{% static 'img/gallery-3.jpg' %}" alt="..." class="img-fluid">
            <div class="overlay d-flex align-items-center justify-content-center"><i class="icon-search"></i></div>
          </a></div>
      </div>
      <div class="mix col-lg-3 col-md-3 col-sm-6">
        <div class="item"><a href="img/gallery-4.jpg" data-fancybox="gallery" class="image"><img
              src="{% static 'img/gallery-4.jpg' %}" alt="..." class="img-fluid">
            <div class="overlay d-flex align-items-center justify-content-center"><i class="icon-search"></i></div>
          </a></div>
      </div>
    </div>
  </section>
  <!-- Page Footer-->
  <footer class="main-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="logo">
            <h6 class="text-white">Bootstrap Blog</h6>
          </div>
          <div class="contact-details">
            <p>53 Broadway, Broklyn, NY 11249</p>
            <p>Phone: (020) 123 456 789</p>
            <p>Email: <a href="mailto:info@company.com">Info@Company.com</a></p>
            <ul class="social-menu">
              <li class="list-inline-item"><a href="#"><i class="fa fa-facebook"></i></a></li>
              <li class="list-inline-item"><a href="#"><i class="fa fa-twitter"></i></a></li>
              <li class="list-inline-item"><a href="#"><i class="fa fa-instagram"></i></a></li>
              <li class="list-inline-item"><a href="#"><i class="fa fa-behance"></i></a></li>
              <li class="list-inline-item"><a href="#"><i class="fa fa-pinterest"></i></a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-4">
          <div class="menus d-flex">
            <ul class="list-unstyled">
              <li> <a href="#">My Account</a></li>
              <li> <a href="#">Add Listing</a></li>
              <li> <a href="#">Pricing</a></li>
              <li> <a href="#">Privacy &amp; Policy</a></li>
            </ul>
            <ul class="list-unstyled">
              <li> <a href="#">Our Partners</a></li>
              <li> <a href="#">FAQ</a></li>
              <li> <a href="#">How It Works</a></li>
              <li> <a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-4">
          <div class="latest-posts"><a href="#">
              <div class="post d-flex align-items-center">
                <div class="image"><img src="{% static 'img/small-thumbnail-1.jpg' %}" alt="..." class="img-fluid">
                </div>
                <div class="title"><strong>Hotels for all budgets</strong><span class="date last-meta">October 26,
                    2016</span></div>
              </div>
            </a><a href="#">
              <div class="post d-flex align-items-center">
                <div class="image"><img src="{% static 'img/small-thumbnail-2.jpg' %}" alt="..." class="img-fluid">
                </div>
                <div class="title"><strong>Great street atrs in London</strong><span class="date last-meta">October 26,
                    2016</span></div>
              </div>
            </a><a href="#">
              <div class="post d-flex align-items-center">
                <div class="image"><img src="{% static 'img/small-thumbnail-3.jpg' %}" alt="..." class="img-fluid">
                </div>
                <div class="title"><strong>Best coffee shops in Sydney</strong><span class="date last-meta">October 26,
                    2016</span></div>
              </div>
            </a></div>
        </div>
      </div>
    </div>
    <div class="copyrights">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <p>&copy; 2017. All rights reserved. Your great site.</p>
          </div>
          <div class="col-md-6 text-right">
            <p>Template By <a href="https://bootstrapious.com/p/bootstrap-carousel" class="text-white">Bootstrapious</a>
              <!-- Please do not remove the backlink to Bootstrap Temple unless you purchase an attribution-free license @ Bootstrap Temple or support us at http://bootstrapious.com/donate. It is part of the license conditions. Thanks for understanding :) -->
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- JavaScript files-->
  <script src="{% static 'vendor/jquery/jquery.min.js' %}"></script>
  <script src="{% static 'vendor/popper.js/umd/popper.min.js' %}"> </script>
  <script src="{% static 'vendor/bootstrap/js/bootstrap.min.js' %}"></script>
  <script src="{% static 'vendor/jquery.cookie/jquery.cookie.js' %}"> </script>
  <script src="{% static 'vendor/@fancyapps/fancybox/jquery.fancybox.min.js' %}"></script>
  <script src="{% static 'js/front.js' %}"></script>
</body>

</html>
{% endraw %}
{% endhighlight %}
We have replaced the code section of Hero and Divider section by moving the inline styles to custom.css in css folder because there is no way we can give quotation mark inside a quotation mark. i.e. while replacing url with static we have to use quotation mark.

{% highlight jinja %}
{% raw %}
<!-- Hero Section-->
<section style="background: url(img/hero.jpg); background-size: cover; background-position: center center" class="hero">

<!-- Replaced with -->

<!-- Hero Section-->
<section id="hero-section" class="hero">

<!-- Divider Section-->
<section style="background: url(img/divider-bg.jpg); background-size: cover; background-position: center bottom" class="divider">      

<!-- Replaced with -->

<!-- Divider Section-->
<section id="divider-bg" class="divider">
{% endraw %}
{% endhighlight %}

Copy the below code inside custom.css inside the css folder.

{% highlight css %}
/* your styles go here */

#hero-section {
    background: url("../img/hero.jpg");
    background-size: cover; 
    background-position: center center;
}

#divider-bg {
    background: url("../img/divider-bg.jpg");
    background-size: cover;
    background-position: center bottom;
}
{% endhighlight %}

*Now if you runserver and go the root url you will see index page exactly as it from downloaded template from bootstrapious. See you in the next part.*