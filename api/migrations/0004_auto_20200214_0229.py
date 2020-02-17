# Generated by Django 2.2.9 on 2020-02-14 02:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200214_0102'),
    ]

    operations = [
        migrations.RenameField(
            model_name='alumni',
            old_name='dob',
            new_name='date_of_birth',
        ),
        migrations.AlterField(
            model_name='education',
            name='type_of_degree',
            field=models.CharField(choices=[('mids', 'Middle School Diploma'), ('highs', 'High School Diploma'), ('train', 'Training Program'), ('assoc', 'Associate Degree'), ('bach', 'Bachelors Degree'), ('ms', 'Masters Degree'), ('phd', 'Ph. D')], default='Training Program', max_length=20, verbose_name='degree_level'),
        ),
        migrations.AlterField(
            model_name='job',
            name='job_title',
            field=models.CharField(max_length=40, verbose_name='job_title'),
        ),
        migrations.AlterField(
            model_name='unemployed',
            name='degree_level',
            field=models.CharField(choices=[('mids', 'Middle School Diploma'), ('highs', 'High School Diploma'), ('train', 'Training Program'), ('assoc', 'Associate Degree'), ('bach', 'Bachelors Degree'), ('ms', 'Masters Degree'), ('phd', 'Ph. D')], default='Training Program', max_length=20, verbose_name='degree_level'),
        ),
    ]