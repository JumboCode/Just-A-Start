from api.models import Job, Education, Alumnus
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib import admin
from django.db import models


class AlumnusInline(admin.StackedInline):
    model = Alumnus
    can_delete = False
    verbose_name_plural = 'alumnus'


class JobInline(admin.StackedInline):
    model = Job
    verbose_name_plural = 'job'


class EducationInline(admin.TabularInline):
    model = Education
    verbose_name_plural = 'education'


class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    inlines = (AlumnusInline, EducationInline, JobInline)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
