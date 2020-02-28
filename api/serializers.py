from rest_framework import serializers
from api.models import Job, Unemployed, Education, User

class UserSerializer(serializers.ModelSerializer):
    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'updated_time')

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