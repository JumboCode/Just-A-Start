from rest_framework import serializers
from api.models import Alumni, Job

class AlumniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumni
        fields = ('first_name', 'last_name', 'email', 'phone', 'dob', 'jobs', 'last_updated')

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('job_title', 'employer_org', 'start_date', 'end_date',\
                  'pay_rate', 'hours_week', 'role_description')

