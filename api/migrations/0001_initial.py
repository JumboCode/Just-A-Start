# Generated by Django 2.2.9 on 2020-02-19 00:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Alumni',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=20, verbose_name='first_name')),
                ('last_name', models.CharField(max_length=20, verbose_name='last_name')),
                ('email', models.EmailField(max_length=30, unique=True, verbose_name='email')),
                ('phone', models.CharField(max_length=100, verbose_name='phone')),
                ('date_of_birth', models.DateField(max_length=100, verbose_name='date_of_birth')),
                ('updated_time', models.DateTimeField(auto_now=True, verbose_name='updated_time')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Unemployed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(max_length=100, verbose_name='start_date')),
                ('end_date', models.DateField(max_length=100, null=True, verbose_name='end_date')),
                ('desired_job', models.CharField(max_length=20, verbose_name='desired_job')),
                ('degree_level', models.CharField(choices=[('mids', 'Middle School Diploma'), ('highs', 'High School Diploma'), ('train', 'Training Program'), ('assoc', 'Associate Degree'), ('bach', 'Bachelors Degree'), ('ms', 'Masters Degree'), ('phd', 'Ph. D')], default='Training Program', max_length=20, verbose_name='degree_level')),
                ('alumni', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Alumni')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(max_length=100, verbose_name='start_date')),
                ('end_date', models.DateField(max_length=100, null=True, verbose_name='end_date')),
                ('employer_org', models.CharField(max_length=30, verbose_name='employer_org')),
                ('job_title', models.CharField(max_length=40, verbose_name='job_title')),
                ('pay_rate', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='pay_rate')),
                ('hours_week', models.DecimalField(decimal_places=2, max_digits=4, verbose_name='hours_week')),
                ('role_description', models.TextField(verbose_name='role_description')),
                ('alumni', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Alumni')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(max_length=100, verbose_name='start_date')),
                ('end_date', models.DateField(max_length=100, null=True, verbose_name='end_date')),
                ('name_of_institution', models.CharField(max_length=30, verbose_name='name_of_institution')),
                ('type_of_degree', models.CharField(choices=[('mids', 'Middle School Diploma'), ('highs', 'High School Diploma'), ('train', 'Training Program'), ('assoc', 'Associate Degree'), ('bach', 'Bachelors Degree'), ('ms', 'Masters Degree'), ('phd', 'Ph. D')], default='Training Program', max_length=20, verbose_name='degree_level')),
                ('type_of_institution', models.CharField(max_length=30, verbose_name='type_of_institution')),
                ('program', models.CharField(max_length=20, verbose_name='prog')),
                ('alumni', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Alumni')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
