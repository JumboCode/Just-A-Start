from django.db import models
import datetime

class Alumni(models.Model):
    first_name      = models.CharField('first_name', max_length=20)
    last_name       = models.CharField('last_name', max_length=20)
    email           = models.EmailField('email', max_length=30, unique=True)
    phone           = models.CharField('phone', max_length=100)
    dob             = models.DateField('date_of_birth', max_length=100)
    updated_time    = models.DateTimeField('updated_time',auto_now=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

    # def create_new_alumni(self, alumni):
    #     new_alumni = self.create(name = alumni.name, email = alumni.email,
    #                              phone_num = alumni.phone_num,  dob = alumni.dob, 
    #                              jobs = add_jobs(alumni.jobs), last_update =  datetime.now())
    #     return new_alumni

    # def save(self, *args, **kwargs):
    #     super(models.Model, self).save(*args, **kwargs)  # Call the "real" save() method.

class Experience(models.Model):
    alumni              = models.ForeignKey(Alumni, on_delete=models.CASCADE, default=1)
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