# Generated by Django 3.0.3 on 2020-07-14 07:09

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
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(null=True)),
                ('employer_org', models.CharField(max_length=30)),
                ('job_title', models.CharField(max_length=40)),
                ('pay_rate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('hours_week', models.DecimalField(decimal_places=2, max_digits=4)),
                ('role_description', models.TextField(null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(null=True)),
                ('program_name', models.CharField(max_length=30, null=True)),
                ('degree_type', models.CharField(choices=[('masters', 'Masters Degree'), ('associate', 'Associate Degree'), ('phd', 'Ph. D'), ('bachelors', "Bachelor's Degree"), ('training program', 'Training Program'), ('minor', 'Minor'), ('middle school degree', 'Middle School Diploma'), ('high school degree', 'High School Diploma')], default='training program', max_length=30)),
                ('name_of_institution', models.CharField(max_length=30)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='educations', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Alumnus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('desired_job', models.CharField(max_length=20, null=True)),
                ('phone_number', models.CharField(max_length=12, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='alumnus', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
