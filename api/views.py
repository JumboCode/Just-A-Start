from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from api.models import User, Experience, Job, Unemployed, Education
from api.serializers import UserSerializer, JobSerializer, UnemployedSerializer, EducationSerializer
from django.core import serializers
from itertools import chain

import os
import json
# from settings.py import connection
# from settings import connection

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['GET'])
    def get_user_profile(self, request):
        print(request.GET.get('key',''))
        user = Token.objects.get(key=request.GET['key']).user
        serialized_user = serializers.serialize('json', [user, ])
        return HttpResponse(serialized_user, content_type='application/json')
        # return HttpResponse("soon")

    @action(detail=False, methods=['GET'])
    def get_user_by_email(self, request):
        user = User.objects.get(email=request.GET.get('email'))
        serialized_user = serializers.serialize('json', [user, ])
        return HttpResponse(serialized_user)
    
    @action(detail=False, methods=['POST'])
    def get_user_experiences(self, request):
        user = Token.objects.get(key=request.POST["key"]).user

        job_list = user.job_set.all()
        education_list = user.education_set.all()
        unemployed_list = user.unemployed_set.all()
        chained_list = chain(job_list, education_list, unemployed_list)
        serialized_experiences = serializers.serialize('json', chained_list)
        return HttpResponse(serialized_experiences)
    
    @action(detail=False, methods=['PUT'])
    def edit_user_profile(self, request):
        user = Token.objects.get(key=request.POST["key"]).user
        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            user_saved = serializer.save()
            return HttpResponse({"Success": "User information updated successfully"})
        return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['PUT'])
    def edit_user_experiences(self, request):
        user = Token.objects.get(key=request.POST["key"]).user
        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            user_saved = serializer.save()
        return HttpResponse({"success": "User experience information updated successfully"})
    
    # NEEDS WORK
    @action(detail=False, methods=['delete'])
    def delete_user_profile(self, request):
        return HttpResponse({"success": "User profile deleted successfully"})

    # Note: account_sid, auth_token, from_  : 
    # you get these values form twilio when you create account
    # expects a dictionary that has two keys, numbers and message
    @action(detail=False, methods=['POST'])
    def send_text(self, request):
        # Your Account SID and Auth Token from twilio.com/console
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token  = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)

        num_users = len(request.data["numbers"])
        # Iterate through list of people
        for i in range(num_users):
            message = client.messages.create(
                # Phone number associated to your account from twilio
                # Twilio generates this number
                from_="+12055370058", 
                body= request.data["message"],
                to = request.data["numbers"][i])

        return HttpResponse({"success": "Message sent successfully"})

    # Parameters: request is a dictionary that contains 3 fields;
    #  Field 1: email: a key corresponding to a list of email addresses
    #  Field 2: subject: a key corresponding to a string value to be subject of the email to be send
    #  Field 3: body:  a key correspondig to string value for the body of the email
    @action(detail=False, methods=['POST'])
    def send_email(self, request):
        # using SendGrid's Python Library
        # you need to set up a variable environment. follow the link for more details
        # https://github.com/sendgrid/sendgrid-python

        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        
        num_users = len(request.data["email"])
        for i in range(num_users):
            message = Mail(
                from_email='naokiokada11@gmail.com', 
                to_emails= request.data["email"][i],
                subject= request.data["subject"],
                html_content = '<strong>' + request.data["body"] + '</strong>')

            sg.send(message)
        
        return HttpResponse({"success": "Email sent successfully"})

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    @action(detail=False, methods=['PUT'])
    def edit_job_information(self, request):
        user = Token.objects.get(key=request.POST["key"]).user
        job_list = user.job_set.all()
        print(job_list[0])
        # serializer = JobSerializer(instance=user, data=request.data, partial=True)
        # if serializer.is_valid(raise_exception=True):
        #     user_saved = serializer.save()
        #     return HttpResponse({"Success": "User information updated successfully"})
        return HttpResponse({"Success": "User information updated successfully"})

class UnemployedViewSet(viewsets.ModelViewSet):
    queryset = Unemployed.objects.all()
    serializer_class = UnemployedSerializer

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer