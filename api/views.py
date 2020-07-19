import os
from api.models import Alumnus, Education, Job
from api.serializers import AlumnusSerializer
from api.serializers import UserSerializer
from api.serializers import EducationSerializer
from api.serializers import JobSerializer

from django.contrib.auth.models import User
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse

from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from twilio.rest import Client

class AdminMessaging(viewsets.GenericViewSet,):
    permission_classes = (IsAdminUser,)

    @action(detail=False, methods=['POST'])
    def send_email(self, request):
        subject = request.POST.get("subject", "")
        message = request.POST.get("message", "")
        from_email = request.POST.get("from_email", "")
        to_ids = request.POST.get("to_ids", "")
        for user_id in to_ids:
            user = User.objects.get(id=user_id)
            to_email = user["email"]
            if subject and message and from_email and to_email:
                try:
                    send_mail(subject, message, from_email, to_email)
                except BadHeaderError:
                    return HttpResponse("Invalid header found.")
            else:
                return HttpResponse("Make sure all fields are valid.")
        return HttpResponse({"Success": "Email sent successfully"})

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
                from_="+13344878242",
                body= request.data["message"],
                to = request.data["numbers"][i])

        return HttpResponse({"success": "Message sent successfully"})


class AlumnusViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = AlumnusSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Alumnus.objects.filter(user=self.request.user)


class EducationViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = EducationSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Education.objects.filter(user=self.request.user)


class JobViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = JobSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Job.objects.filter(user=self.request.user)


class Registration(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserViewSet(
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

class AdminUserViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()

class AdminAlumnusViewset(viewsets.ModelViewSet):
    serializer_class = AlumnusSerializer
    permission_classes = (IsAdminUser,)
    queryset = Alumnus.objects.all()

class AdminJobViewset(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = (IsAdminUser,)
    queryset = Job.objects.all()

class AdminEducationViewset(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = (IsAdminUser,)
    queryset = Education.objects.all()

class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)