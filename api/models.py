from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token

import datetime

class User(AbstractUser):
    phone           = models.CharField('phone', max_length=100)
    date_of_birth   = models.DateField('date_of_birth', max_length=100, null=True, blank=True)
    updated_time    = models.DateTimeField('updated_time',auto_now=True)
    admin           = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name + " " + self.last_name

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Experience(models.Model):
    alumni              = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    start_date          = models.DateField('start_date', max_length=100)
    end_date            = models.DateField('end_date', max_length=100, null=True, blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.alumni.__str__()

class Job(Experience):
    employer_org     = models.CharField('employer_org', max_length=30)
    job_title        = models.CharField('job_title', max_length=40)
    pay_rate         = models.DecimalField('pay_rate', max_digits=5, decimal_places=2)
    hours_week       = models.DecimalField('hours_week', max_digits=4, decimal_places=2)
    role_description = models.TextField('role_description')

    def __str__(self):
        return self.alumni.__str__() + ": " + self.job_title + " at " + self.employer_org

class Unemployed(Experience):
    degree_levels = [('mids',  'Middle School Diploma'),
                    ('highs', 'High School Diploma'),
                    ('train', 'Training Program'),
                    ('assoc', 'Associate Degree'),
                    ('bach', 'Bachelors Degree'),
                    ('ms', 'Masters Degree'),
                    ('phd', 'Ph. D'),
    ]

    desired_job     = models.CharField('desired_job',max_length=20)
    degree_level    = models.CharField('degree_level',choices=degree_levels,max_length=20,default='Training Program')

    def __str__(self):
        return "Desired Job:" + self.desired_job

class Education(Experience):
    degree_levels = [('mids',  'Middle School Diploma'),
                    ('highs', 'High School Diploma'),
                    ('train', 'Training Program'),
                    ('assoc', 'Associate Degree'),
                    ('bach', 'Bachelors Degree'),
                    ('ms', 'Masters Degree'),
                    ('phd', 'Ph. D'),
    ]

    name_of_institution = models.CharField('name_of_institution',max_length=30)
    type_of_degree      = models.CharField('degree_level',choices=degree_levels,max_length=20,default='Training Program')
    type_of_institution = models.CharField('type_of_institution',max_length=30)
    program             = models.CharField('prog', max_length=20)

    def __str__(self):
        return self.type_of_degree + " at " + self.name_of_institution