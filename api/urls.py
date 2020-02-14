from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.conf.urls import include
from api import views
from rest_framework import routers
from .views import AlumniViewSet, JobViewSet, UnemployedViewSet, EducationViewSet

router = routers.DefaultRouter()
router.register('alumni', AlumniViewSet)
router.register('jobs', JobViewSet)
router.register('unemployed', UnemployedViewSet)
router.register('education', EducationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
