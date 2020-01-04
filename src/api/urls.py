from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from api import views

urlpatterns = [
    url(r'^get/$', get_user, name='index'),
]
