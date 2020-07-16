from api.models import Job, Education, Alumnus
from django.contrib.auth.models import User
from rest_framework import serializers

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = (
            'employer_org', 'end_date', 'id', 'job_title', 'hours_week',
            'pay_rate', 'role_description', 'start_date', 'user_id',
        )
        read_only_fields = ('id', 'user', 'user_id')


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = (
            'end_date', 'id', 'name_of_institution', 'program_name',
            'start_date', 'degree_type', 'user_id',
        )
        read_only_fields = ('id', 'user', 'user_id')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email', 'first_name', 'id', 'is_staff', 'last_name',
            'username', 'password',
        )
        read_only_fields = ('id', 'is_staff')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Alumnus.objects.create(user=user)
        return user


class AlumnusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumnus
        fields = ('desired_job', 'id', 'phone_number', 'user_id', 'date_of_birth')
        read_only_fields = ('id', 'user', 'user_id')
