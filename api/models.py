from django.contrib.auth.models import User
from django.db import models

class Job(models.Model):
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    employer_org = models.CharField(max_length=30)
    job_title = models.CharField(max_length=40)
    pay_rate = models.DecimalField(max_digits=5, decimal_places=2)
    hours_week = models.DecimalField(max_digits=4, decimal_places=2)
    role_description = models.TextField(null=True)
    user = models.ForeignKey(User,
                             related_name='jobs',
                             on_delete=models.CASCADE)

    def __str__(self):
        return "{} at {} for {} hours per week".format(
            self.job_title,
            self.employer_org,
            self.hours_week,
        )


class Education(models.Model):

    DEGREE_ASSOCIATE = "associate"
    DEGREE_BACHELORS = "bachelors"
    DEGREE_MASTERS = "masters"
    DEGREE_PHD = "phd"
    DIPLOMA_HIGH_SCHOOL = "high school degree"
    DIPLOMA_MIDDLE_SCHOOL = "middle school degree"
    MINOR = "minor"
    TRAINING_PROGRAM = "training program"

    DEGREES_COLLEGE = {
        DEGREE_ASSOCIATE,
        DEGREE_BACHELORS,
        DEGREE_MASTERS,
        DEGREE_PHD,
        MINOR,
    }

    DEGREES_PRECOLLEGE = {DIPLOMA_MIDDLE_SCHOOL, DIPLOMA_HIGH_SCHOOL}

    DEGREE_TYPES = {
        (DEGREE_ASSOCIATE, 'Associate Degree'),
        (DEGREE_BACHELORS, 'Bachelor\'s Degree'),
        (MINOR, 'Minor'),
        (DEGREE_MASTERS, 'Masters Degree'),
        (DEGREE_PHD, 'Ph. D'),
        (DIPLOMA_MIDDLE_SCHOOL, 'Middle School Diploma'),
        (DIPLOMA_HIGH_SCHOOL, 'High School Diploma'),
        (TRAINING_PROGRAM, 'Training Program'),
    }

    DEGREE_DICT = {
        DEGREE_ASSOCIATE: 'Associate Degree',
        DEGREE_BACHELORS: 'Bachelor\'s Degree',
        MINOR: 'Minor',
        DEGREE_MASTERS: 'Masters Degree',
        DEGREE_PHD: 'Ph. D',
        DIPLOMA_MIDDLE_SCHOOL: 'Middle School Diploma',
        DIPLOMA_HIGH_SCHOOL: 'High School Diploma',
        TRAINING_PROGRAM: 'Training Program'
    }

    start_date = models.DateField()
    end_date = models.DateField(null=True)
    program_name = models.CharField(max_length=30, null=True)
    degree_type = models.CharField(
        choices=DEGREE_TYPES, default=TRAINING_PROGRAM, max_length=30)
    name_of_institution = models.CharField(max_length=30)
    user = models.ForeignKey(User,
                             related_name='educations',
                             on_delete=models.CASCADE)

    @property
    def name(self):
        if self.degree_type in self.DEGREES_COLLEGE:
            return "Earned %s in %s at %s" % (
                self.DEGREE_DICT[self.degree_type],
                self.program_name,
                self.name_of_institution,
            )
        elif self.degree_type == self.TRAINING_PROGRAM:
            return "Completed %s at %s" % (
                self.program_name,
                self.name_of_institution,
            )
        elif self.degree_type in self.DEGREES_PRECOLLEGE:
            return "Recieved %s at %s" % (
                self.DEGREE_DICT[self.degree_type],
                self.name_of_institution,
            )

    def __str__(self):
        return self.name


class Alumnus(models.Model):
    user = models.OneToOneField(
        User, related_name="alumnus", on_delete=models.CASCADE)

    desired_job = models.CharField(max_length=20, null=True)
    phone_number = models.CharField(max_length=12, null=True)
    date_of_birth = models.DateField(null=True)

    def __str__(self):
        return "User %s %s wants to work as a %s" % (
            self.user.first_name,
            self.user.last_name,
            self.desired_job,
        )
