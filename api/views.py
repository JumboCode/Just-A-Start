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
from twilio.rest import Client
# from settings.py import connection
# from settings import connection

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['POST'])
    def get_user_profile(self, request):
        user = Token.objects.get(key=request.POST.get('key')).user
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
        data = request.data.get('user')
        serializer = UserSerializer(instance=user, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            user_saved = serializer.save()
        return HttpResponse({"success": "User updated successfully"})

    # Note: account_sid, auth_token, from_  : 
    # you get these values form twilio when you create account
    # expects a dictionary that has two keys, numbers and message
    @action(detail=False, methods=['POST'])
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

    # Parameters: request is a dictionary that contains 3 fields;
    #  Field 1: email: a key corresponding to a list of email addresses
    #  Field 2: subject: a key corresponding to a string value to be subject of the email to be send
    #  Field 3: body:  a key correspondig to string value for the body of the email
    @action(detail=False, methods=['POST'])
    def send_email(self, request):
        # using SendGrid's Python Library
        # you need to set up a variable environment. follow the link for more details
        # https://github.com/sendgrid/sendgrid-python

        # if you set up variable environment use the following line that is commented out
        # sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))

        # otherwise, use the following code and put your API Key in the paranthesis
        sg = SendGridAPIClient('')

        for user in request["email"]:
            message = Mail(
                from_email='fill  in your email address', 
                to_emails= user,
                subject= request["subject"],
                #html_content='<strong>and easy to do anywhere, even with Python</strong>')
                html_content = '<strong>' + request["body"] + '</strong>')

            sg.send(message)

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class UnemployedViewSet(viewsets.ModelViewSet):
    queryset = Unemployed.objects.all()
    serializer_class = UnemployedSerializer

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer