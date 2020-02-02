# Generated by Django 2.2.9 on 2020-02-01 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_title', models.CharField(max_length=100, verbose_name='job_title')),
                ('employer_org', models.CharField(max_length=100, verbose_name='employer_org')),
                ('start_date', models.DateField(max_length=100, verbose_name='start_date')),
                ('end_date', models.DateField(max_length=100, null=True, verbose_name='end_date')),
                ('pay_rate', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='pay_rate')),
                ('hours_week', models.DecimalField(decimal_places=2, max_digits=4, verbose_name='hours_week')),
                ('role_description', models.TextField(verbose_name='role_description')),
            ],
        ),
        migrations.CreateModel(
            name='Alumni',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(default='Ming', max_length=100, verbose_name='First Name')),
                ('last_name', models.CharField(default='Chow', max_length=100, verbose_name='Last Name')),
                ('email', models.CharField(max_length=200, unique=True, verbose_name='Email')),
                ('phone', models.CharField(max_length=100, verbose_name='Phone')),
                ('dob', models.CharField(max_length=100, verbose_name='Date of birth')),
                ('last_updated', models.DateTimeField(verbose_name='Update Time')),
                ('jobs', models.ManyToManyField(to='api.Job')),
            ],
        ),
    ]