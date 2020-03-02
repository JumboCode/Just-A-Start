from django.test import TestCase
from .models import Alumni
from rest_framework.test import APITestCase, APIClient
from api.views import AlumniViewSet


# Create your tests here.

class BaseViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def add_alumni(name=""):
        if name != "":
            Alumni.objects.create(name=name)

    def set_up(self):
        self.add_alumni("a1")
        self.add_alumni("a2")
        self.add_alumni("a3")
        self.add_alumni("a4")
        self.add_alumni("a5")
    
class RetrieveData(BaseViewTest):

    def all_alumnis(self):
        entries = Alumni.objects.all()



class AlumniViewTest(APITestCase):

    def send_text_test(self):
        data = {'numbers': ['+18572968300', '+18572538222'],
                'message': "hello, test passed"}

        AlumniViewSet.send_text(self, data)




        

