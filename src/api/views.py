from django.shortcuts import render

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