---
layout: page
image_path: /static/img/blogs/TicTacToe.png
title:  "Blog application in django | Part 1 - Setup virtual environment and create django blog project"
permalink: "/blogs/django-blog-application-virtual-environment-setup-project/"
created: 2021-09-09 15:33:00 +0545
description: "In this section we are going to setup the virtual environment for django blog project and configuring other necessary settings parameters in project file. After creating project we will create blog and user app with simple database model. In the following section we will further extend these apps."
categories: Blog Django
published: false
tags: Blog Django Vritual-Environment
---

{% highlight python %}
class TicTacToe:
    def __init__(self):
        self.__game_board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        self.__step = 0 # for tracking moves
        self.__turn = 0 # if 0 -> player first and if 1 -> cpu first
        self.__EMPTY_MARK = 0
        self.__PLAYER_MARK = 1
        self.__CPU_MARK = 2
{% endhighlight %}

{% highlight html %}
+-----------+
| X |   | X |
+-----------+
| O | O | O |
+-----------+
| X | O | X |
+-----------+
{% endhighlight %}
