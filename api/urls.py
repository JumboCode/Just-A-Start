from django.contrib import admin
from django.conf.urls import include, url
from django.urls import path

from api import views

from rest_framework import routers
from rest_framework.authtoken import views as auth_views

router = routers.DefaultRouter()

router.register(r"alumnus", views.AlumnusViewSet, basename="alum")
router.register(r"educations", views.EducationViewSet, basename="education")
router.register(r"jobs", views.JobViewSet, basename="job")
router.register(r"messaging", views.AdminMessaging, basename="messaging")
router.register(r"users", views.UserViewSet, basename="user")
router.register(r"registration", views.Registration, basename="registration")
router.register(r"admin_user", views.AdminUserViewset, basename="admin_user")
router.register(r"admin_alumnus", views.AdminAlumnusViewset, basename="admin_user")
router.register(r"admin_job", views.AdminJobViewset, basename="admin_job")
router.register(r"admin_education", views.AdminEducationViewset, basename="admin_education")

urlpatterns = [
    url(r"^", include(router.urls)),
    url(r"api-auth/", include("rest_framework.urls")),
    url(r"^api-token-auth/", auth_views.obtain_auth_token, name="obtain_auth_token"),
    url(r"^admin/", admin.site.urls),
    url(r'^logout/', views.Logout.as_view()),
]
