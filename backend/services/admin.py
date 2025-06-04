from django.contrib import admin
from .models import Service

@admin.register(Service) # This decorator registers the Service model with ServiceAdmin options
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'duration', 'price') # Added description to list_display
    search_fields = ('name', 'description')
    list_filter = ('duration', 'price')

