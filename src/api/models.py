from django.db import models
import datetime

class Job(models.Model):
    job_title        = models.CharField('job_title', max_length=100)
    employer_org     = models.CharField('employer_org', max_length=100)
    start_date       = models.DateField('start_date', max_length=100)
    end_date         = models.DateField('end_date', max_length=100, null=True)
    pay_rate         = models.DecimalField('pay_rate', max_digits=5, decimal_places=2)
    hours_week       = models.DecimalField('hours_week', max_digits=4, decimal_places=2)
    role_description = models.TextField('role_description')

    def __str__(self):
        # job = {
        #     "job_title"         :self.job_title,
        #     "employer_org"      :self.employer_org,
        #     "start_date"        :self.start_date,
        #     "end_date"          :self.end_date,
        #     "pay_rate"          :self.pay_rate,
        #     "hours_week"        :self.hours_week,
        #     "role_description"  :self.role_description,
        # }
        
        # return str(job)

        return self.job_title + " at " + self.employer_org

class Alumni(models.Model):
    first_name      = models.CharField('First Name', max_length=100, default='Ming')
    last_name       = models.CharField('Last Name', max_length=100, default='Chow')
    email           = models.CharField('Email', max_length=200, unique=True)
    phone           = models.CharField('Phone', max_length=100)
    dob             = models.CharField('Date of birth', max_length=100)
    jobs            = models.ManyToManyField(Job)
    last_updated    = models.DateTimeField('Update Time')

    def __str__(self):
        alumni = {
            "first_name"  :self.first_name,
            "last_name"   :self.last_name,
            "email"       :self.email,
            "phone_num"   :self.phone,
            "dob"         :self.dob,
            "jobs"        :self.jobs.__str__(),
            "update"      :self.last_update,
        }
        return str(alumni)

    # def create_new_alumni(self, alumni):
    #     new_alumni = self.create(name = alumni.name, email = alumni.email,
    #                              phone_num = alumni.phone_num,  dob = alumni.dob, 
    #                              jobs = add_jobs(alumni.jobs), last_update =  datetime.now())
    #     return new_alumni

    # def save(self, *args, **kwargs):
    #     super(models.Model, self).save(*args, **kwargs)  # Call the "real" save() method.