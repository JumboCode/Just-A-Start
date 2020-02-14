from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from copy import deepcopy

from api.models import Alumni, Job
from api.serializers import AlumniSerializer, JobSerializer

# from twilio.rest import Client
# from settings.py import connection
# from settings import connection

class AlumniViewSet(viewsets.ModelViewSet):
    queryset = Alumni.objects.all()
    serializer_class = AlumniSerializer
    heloooooo = Job.objects.all()
    
    @action(detail=False, methods=['GET'])
    def get_user(self, request):
        user = self.queryset.get(email=request.data['email'])
        return HttpResponse(user.first_name.__str__() + " " + user.jobs.__str__())

    # Returns a list of all Alumni in Database
    @action(detail=False, methods=['GET'])
    def get_all_users(self, request):
        users = Alumni.objects.order_by('-last_updated')[:]
        return HttpResponse(users.__str__())

    @action(detail=False, methods=['GET'])
    def delete_user(self, request):
        alumni_to_delete = self.queryset.get(email=request.data['email'], first_name=request.data['first_name'])
        user = deepcopy(alumni_to_delete)
        alumni_to_delete.delete()
        return HttpResponse("deleted:", user.first_name.__str__())

    


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    @action(detail=False, methods=['GET'])
    def get_job(self, request):
        user = self.queryset.get(job_title=request.data['job_title'], employer_org=request.data['employer_org'])
        return HttpResponse(user.first_name.__str__() + " " + user.jobs.__str__())


# #Note: account_sid, auth_token, from_  :  you get these values form twilio when you create account
# def send_text(list_users, text):
#     # Your Account SID from twilio.com/console
#     account_sid = ""
#     # Your Auth Token from twilio.com/console
#     auth_token  = ""

#     client = Client(account_sid, auth_token)

#     #iterate through list of people
#     for user in list_users:
#         message = client.messages.create(
#             #you phone number associated to your account from twilio
#             #Twilio generates this number
#             from_="", 
#             body= text,
#             to = user)


# '''this function accepts two parameters:
#     a request and key for the query in order to provide 
#     list of sorted elements.
#     '''
# def get_sorted(request, query):
#     #establish connection
#     try:
#         conn = psycopg2.connect(

#                     host = "",     #host name of the server
#                     database = "", #database name that you want to querry from
#                     port = "",     #port number 
#                     user = "",     #username to access databae
#                     password = ""  #password for the database
#         )
#     except:
#         raise HTTp404("incorrect request")


#     #generate cursor
#     cur = conn.cursor()

#     # execute the query
#     '''You can select to retrieve every column in the database or
#         you can choose particular columns you want. If you want all columns
#         use:  cur.execute("select * From tablename")
#     '''

#     cur.execute("select username, firstname, lastname, phone, action FROM tablename")

#     #retrieves all rows from the table in form of a list of tuples
#     ''' the data is retrieved in the following form
#         [(username, firstname, lastname, phone, action)]
        
# #         each tuple in the list represent a row in the database
# #     '''
#     rows = cur.fetchall()


#     #options: username, firstname,or lastname
#     if query == "username": #first column
#         index = 0
#     if query == "firstname": #second column
#         index = 1
#     if query == "lastname":  #third column
#         index = 2
#     else:
#         raise  HTTP404("incorrect query")

#     #sorts the list of tuples depending on the query passed it
#     rows.sort(key=lambda tup: tup[index])

#     #close cursor
#     cur.close()
#     #close the connection
#     conn.close()

#     #you should put your html file in charge of this view instead of sorted.html
#     return render(request,'sorted.html', context=rows)
