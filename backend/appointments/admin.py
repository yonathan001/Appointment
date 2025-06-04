from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'staff', 'service', 'date', 'time', 'status')
    list_filter = ('status', 'date', 'staff__username', 'client__username', 'service__name')
    search_fields = (
        'client__first_name',  # Search by client's first name
        'client__last_name',   # Search by client's last name
        'client__username',    # Search by client's username
        'staff__first_name',   # Search by staff's first name
        'staff__last_name',    # Search by staff's last name
        'staff__username',     # Search by staff's username
        'service__name',       # Search by service name
        'notes'                # Search in appointment notes
    )
    # Using raw_id_fields for ForeignKey fields can improve performance
    # if you have many users or services, as it replaces dropdowns with a lookup widget.
    raw_id_fields = ('client', 'staff', 'service')
    date_hierarchy = 'date' # Adds a date-based navigation drilldown
    ordering = ('-date', '-time') # Default ordering in the admin list

