from django.shortcuts import render
from twilio.rest import Client
import psycopg2
from django.http import Http404
from settings import connection

# Create your functions here.

def test_connection(request):
    return HttpResponse('Connection successful')

# Request contains dict
# dict represents alumni
# value of jobs is list of dicts
def add(request):
    try:
        # Extract data from request
        info = request.GET['alumni']
        # Create new Alumni Model instance
        alumni = Alumni(name=info["name"], email=info["email"], phone=info["phone"], 
                        dob=info["dob"], jobs=info["jobs"], last_update=info["update"])
        # Save alumni object
        alumni.save()
        # Save to DB
        insert_query = """ INSERT INTO ALUMNI (NAME, EMAIL, PHONE, DOB, JOB, UPDATE) 
                                    VALUES (%s,%s,%s,%s,%s,%s)"""
        record = (alumni.name, alumni.email, alumni.phone, alumni.dob, 
                    alumni.jobs, alumni.last_update)
        
        cur = connection.cursor()
        cur.execute(insert_query, record)
        connection.commit()
    except:
        print("Exception raised during insert!")


def delete(request):
    # do something

def edit(request):
    # do something

def index(request):
    my_dict = {'insert_me': "Hello I am from view.py!"}
    return render(request,'index.html', context=my_dict)


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


'''this function accepts two parameters:
    a request and key for the query in order to provide 
    list of sorted elements.
    '''
def get_sorted(request, query):
    #establish connection
    try:
        conn = psycopg2.connect(

                    host = "",     #host name of the server
                    database = "", #database name that you want to querry from
                    port = "",     #port number 
                    user = "",     #username to access databae
                    password = ""  #password for the database
        )
    except:
        raise HTTp404("incorrect request")


    #generate cursor
    cur = conn.cursor()

    # execute the query
    '''You can select to retrieve every column in the database or
        you can choose particular columns you want. If you want all columns
        use:  cur.execute("select * From tablename")
    '''

    cur.execute("select username, firstname, lastname, phone, action FROM tablename")

    #retrieves all rows from the table in form of a list of tuples
    ''' the data is retrieved in the following form
        [(username, firstname, lastname, phone, action)]
        
        each tuple in the list represent a row in the database
    '''
    rows = cur.fetchall()


    #options: username, firstname,or lastname
    if query == "username": #first column
        index = 0
    if query == "firstname": #second column
        index = 1
    if query == "lastname":  #third column
        index = 2
    else:
        raise  HTTP404("incorrect query")

    #sorts the list of tuples depending on the query passed it
    rows.sort(key=lambda tup: tup[index])

    #close cursor
    cur.close()
    #close the connection
    conn.close()

    #you should put your html file in charge of this view instead of sorted.html
    return render(request,'sorted.html', context=rows)




