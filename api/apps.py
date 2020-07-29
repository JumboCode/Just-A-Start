from django.apps import AppConfig

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        from django_rest_passwordreset.signals import reset_password_token_created