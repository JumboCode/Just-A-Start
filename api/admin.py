from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from api.models import Job, Unemployed, Education, User
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import User
# from api.models import Alumni

admin.site.register(Job)
admin.site.register(Unemployed)
admin.site.register(Education)

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone','date_of_birth','admin')}),
    )

    model = User
    list_display = ['username', 'email', 'last_name', 'first_name', 'phone', 'date_of_birth', 'admin']
    
admin.site.register(User, CustomUserAdmin)
# admin.site.register(UserAdmin)