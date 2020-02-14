from rest_framework import serializers
from api.models import Alumni, Job, Unemployed, Education

class AlumniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumni
        fields = ('first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'updated_time')

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('alumni','start_date','end_date','employer_org','job_title','pay_rate','hours_week','role_description')

class UnemployedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unemployed
        fields = ('alumni','start_date','end_date','desired_job','degree_level') 

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ('alumni', 'start_date', 'end_date', 'name_of_institution','type_of_degree','type_of_institution','program')