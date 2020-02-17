from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from api.models import Alumni, Job, Unemployed, Education
from api.serializers import AlumniSerializer, JobSerializer, UnemployedSerializer, EducationSerializer

# from twilio.rest import Client
# from settings.py import connection
# from settings import connection

class AlumniViewSet(viewsets.ModelViewSet):
    queryset = Alumni.objects.all()
    serializer_class = AlumniSerializer
    
    @action(detail=False, methods=['GET'])
    def get_user(self, request):
        user = self.queryset.get(email=request.data['email'])
        return HttpResponse(user.__str__())

        # Returns a list of all Alumni in Database
    @action(detail=False, methods=['GET'])
    def get_all_users(self, request):
        users = Alumni.objects.order_by('-last_updated')[:]
        return HttpResponse(users.__str__())

    @action(detail=False, methods=['GET'])
    def delete_user(self, request):
        alumni_to_delete = self.queryset.get(email=request.data['email'], first_name=request.data['first_name'])
        alumni_to_delete.delete()
        return HttpResponse("deleted")

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class UnemployedViewSet(viewsets.ModelViewSet):
    queryset = Unemployed.objects.all()
    serializer_class = UnemployedSerializer

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
