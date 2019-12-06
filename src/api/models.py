from django.db import models

# Create your models here.

class Job(modesl.Model):
    job_title        = models.CharField('job_title', max_length=100)
    employer_org     = models.CharField('employer_org', max_length=100)
    start_date       = models.DateField('start_date', max_length=100)
    end_date         = models.DateField('end_date', max_length=)
    pay_rate         = models.DecimalField¶('pay_rate', max_digits=5, decimal_places=2)
    hours_week       = models.DecimalField¶('hours_week', max_digits=4, decimal_places=2)
    role_description = models.TimeField('role_description')

    def __str__(self):
        job = {
            "job_title"         :self.job_title,
            "employer_org"      :self.employter_org,
            "start_date"        :self.start_date,
            "end_date"          :self.end_date,
            "pay_rate"          :self.pay_rate,
            "hours_week"        :self.hours_week,
            "role_description"  :self.role_description,
        }
        
        return job

class Alumni(models.Model):

    # DATABASE FIELDS
    name        = models.CharField('name', max_length=100)
    email       = models.CharField('email', max_length=100)
    phone       = models.CharField('phone', max_length=100)
    dob         = models.CharField('dob', max_length=100)
    jobs        = models.ManyToManyField(Job)
    last_update = models.DateTimeField('update')

    def __str__(self):
        alumni = {
            "name"        :self.name,
            "email"       :self.email,
            "phone_num"   :self.phone_num,
            "dob"         :self.dob,
            "jobs"        :self.jobs,
            "update"      :self.last_update,
        }
        return alumni

    def save(self, *args, **kwargs):
        super(Model, self).save(*args, **kwargs)  # Call the "real" save() method.
