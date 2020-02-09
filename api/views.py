from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from twilio.rest import Client

from api.models import Alumni, Job
from api.serializers import AlumniSerializer, JobSerializer

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
    serializer_class = JobSerializer

# Create your functions here.
# def test_connection(request):
#     return HttpResponse('Connection successful')

# Request contains dict
# dict represents alumni
# value of jobs is list of dicts
# def add(request):
#     if request.name != "":
#         new_alumni = Alumni.objects.create_new_alumni(request)
#         new_alumni.save()
#         return new_alumni
#     try:
#         # Extract data from request
#         info = request.GET['alumni']
#         # Create new Alumni Model instance
#         alumni = Alumni(name=info["name"], email=info["email"], phone=info["phone"], 
#                         dob=info["dob"], jobs=info["jobs"], last_update=info["update"])
#         # Save alumni object
#         alumni.save()
#         # Save to DB
#         insert_query = """ INSERT INTO ALUMNI (NAME, EMAIL, PHONE, DOB, JOB, UPDATE) 
#                                     VALUES (%s,%s,%s,%s,%s,%s)"""
#         record = (alumni.name, alumni.email, alumni.phone, alumni.dob, 
#                     alumni.jobs, alumni.last_update)
        
#         cur = connection.cursor()
#         cur.execute(insert_query, record)
#         connection.commit()
#     except:
#         print("Exception raised during insert!")

# def put(request):
#     # Create Alumni object from request

#     #Start db cursor for command
#     cur = connection.cursor()


# def delete(request):
#     # do something
#     # user_name = request.name
#     # user_dob = request.dob
#     # user_email = request.email

#     # alumni_list = Alumni.objects.all()
#     # alumni_to_delete = alumni_list.filter(name = user_name, dob = user_dob, email = user_email)
#     # alumni_to_delete.delete()

# #save changes on database
# '''receives in three parameters:
#     1. primary key for the database
#     2. field to be updated
#     3. the updates
    
#     Note all parameters are string values'''
# def edit(request_key, request_field, request_update):
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

#     try:
#         #generate cursor
#         cur = conn.cursor()

#         sql = "UPDATE {table_name} SET " + request_field + "= %s" + "WHERE email = %s"
#         cur.execute(sql, (request_update, request_key))

#         #commit the changes
#         conn.commit()

#         #close connection
#         cur.close()
#     except (Exception, psycopg2.DatabaseError) as error:
#         print(error)
    
#     conn.close()


# def index(request):
#     # my_dict = {'insert_me': "Hello I am from view.py!"}
#     # return render(request,'index.html', context=my_dict)

# # Deletes
# def get_user(request):
#     # user_name = request.name

#     # alumni_list = Alumni.objects.all()
#     # alumni = alumni_list.filter(name = user_name)
#     # # Assume this is the correct json object
#     # return alumni

# # Returns a list of users in order of when their information
# #       was last updated
# def get_all_users(request):
#     # get objects of users in the database
#     # all_users = Alumni.objects.order_by('-last_update')[:]
#     # print(all_users)
#     # return HttpResponse(all_users)


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
