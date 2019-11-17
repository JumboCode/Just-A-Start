from django.shortcuts import render
from twilio.rest import Client
from .models import Alumni

# Create your functions here.

def test_connection(request):
    return HttpResponse('Connection successful')

def add(request):
    # do something

def delete(request):
    # do something

def edit(request):
    # do something

def index(request):
    my_dict = {'insert_me': "Hello I am from view.py!"}
    return render(request,'index.html', context=my_dict)

def get_all_users(request):
    # get objects of users in the database
    all_users = Alumni.objects.order_by('-last_update')[:]
    return HttpResponse("You're looking at all the user data")


#Note: account_sid, auth_token, from_  :  you get these values form twilio when you create account
def send_text(list_users, text):
    # Your Account SID from twilio.com/console
    account_sid = ""
    # Your Auth Token from twilio.com/console
    auth_token  = ""

    client = Client(account_sid, auth_token)

    #iterate through list of people
    for user in list_users:
        message = client.messages.create(
            #you phone number associated to your account from twilio
            #Twilio generates this number
            from_="", 
            body= text,
            to = user)
