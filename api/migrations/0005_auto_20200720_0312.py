# Generated by Django 3.0.7 on 2020-07-20 03:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200719_0510'),
    ]

    operations = [
        migrations.AlterField(
            model_name='education',
            name='degree_type',
            field=models.CharField(choices=[('middle school degree', 'Middle School Diploma'), ('bachelors', "Bachelor's Degree"), ('phd', 'Ph. D'), ('associate', 'Associate Degree'), ('high school degree', 'High School Diploma'), ('training program', 'Training Program'), ('minor', 'Minor'), ('masters', 'Masters Degree')], default='training program', max_length=30),
        ),
    ]
