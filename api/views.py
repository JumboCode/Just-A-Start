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

    @action(detail=False, methods=['GET'])
    def get_user(self, request):
        user = Token.objects.get(key=request.POST["key"]).user
        serialized_user = serializers.serialize('json', [user, ])
        return HttpResponse(serialized_user)
    
    @action(detail=False, methods=['GET'])
    def get_user_information(self, request):
        user = Token.objects.get(key=request.POST["key"]).user

        job_list = user.job_set.all()
        education_list = user.education_set.all()
        unemployed_list = user.unemployed_set.all()
        chained_list = chain(job_list, education_list, unemployed_list)

        serialized_experiences = serializers.serialize('json', chained_list)

        return HttpResponse(serialized_experiences)

    @action(detail=False, methods=['PUT'])
    def edit_user(self, request, pk):
    
        curr_user = get_object_or_404(queryset, pk)

        data = request.data.get('user')
        serializer = UserSerializer(instance=curr_user, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            user_saved = serializer.save()
        return Response({"success": "User '{}' updated successfully".format(user_saved.first_name)})

       

    @action(detail=False, methods=['GET'])
    def delete_user(self, request):
        user_name = request.name
        user_dob = request.dob
        user_email = request.email
 
        try:
            alumni_to_delete = queryset.filter(first_name = user_name, date_of_birth = user_dob, email = user_email)
        except User.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        alumni_to_delete.delete()


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    alumni_queryset = User.objects.all()
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
