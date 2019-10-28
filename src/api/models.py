from django.db import models

# Create your models here.

class Job(modesl.Model):
    job = models.CharField(
        max_length=100,
    )
class Alumni(models.Model):

    # DATABASE FIELDS
    name       = models.CharField('name', max_length=100)
    email      = models.CharField('email', max_length=100)
    phone_num  = models.CharField('phone', max_length=100)
    dob        = models.CharField('dob', max_length=100)
    job_title  = models.ManyToManyField(Job)
    employer   = models.CharField('employer', max_length=100)
    start_date = models.CharField('start', max_length=100)
    end_date   = models.CharField('end', max_length=100)

    def __str__(self):
        alumni = {
            "name"        :self.name,
            "email"       :self.email,
            "phone_num"   :self.phone_num,
            "dob"         :self.dob,
            "job_title"   :self.job_title,
            "employer"    :self.employer,
            "start_date"  :self.start_date,
            "end_date"    :self.end_date
        }
        return alumni

    def save(self, *args, **kwargs):
        #do_something()
        super().save(*args, **kwargs)  # Call the "real" save() method.
        #do_something_else()



    


