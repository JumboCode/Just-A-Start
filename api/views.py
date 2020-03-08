from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from twilio.rest import Client

from api.models import Alumni, Job, Unemployed, Education
from api.serializers import AlumniSerializer, JobSerializer, UnemployedSerializer, EducationSerializer

# from twilio.rest import Client
# from settings.py import connection
# from settings import connection

class AlumniViewSet(viewsets.ModelViewSet):
    queryset = Alumni.objects.all()
    job_queryset = Job.objects.all()
    serializer_class = AlumniSerializer
    
    @action(detail=False, methods=['GET'])
    def get_user(self, request):
        user = self.queryset.get(email=request.data['email'])
        job = self.job_queryset.get()
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

    @action(detail=False, methods=['POST'])
    #Note: account_sid, auth_token, from_  : 
    # you get these values form twilio when you create account

    #expects a dictionary that has two keys, numbers and message
    def send_text(self, request):
        # Your Account SID from twilio.com/console
        account_sid = ""
        # Your Auth Token from twilio.com/console
        auth_token  = ""

        client = Client(account_sid, auth_token)

        #iterate through list of people
        for user in request["numbers"]:
            message = client.messages.create(
                #you phone number associated to your account from twilio
                #Twilio generates this number
                from_="", 
                body= request["message"],
                to = user)


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    alumni_queryset = Alumni.objects.all()
    serializer_class = JobSerializer

    # To do:
    #       get_job
    #       find_job  == exists?
    #       add_job
    #       delete_job
    
    @action(detail=False, methods=['GET'])
    def get_job(self, request):
        job = self.queryset.get(job_title = request.data['job_title'],)
        return HttpResponse(job.__str__())



class UnemployedViewSet(viewsets.ModelViewSet):
    queryset = Unemployed.objects.all()
    serializer_class = UnemployedSerializer

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
