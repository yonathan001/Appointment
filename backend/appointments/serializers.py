from rest_framework import serializers
from .models import Appointment, Service
from users.serializers import UserSerializer
from services.serializers import ServiceSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Appointment model that handles both read and write operations.
    - For reads, it displays nested client and service details.
    - For writes, it accepts a `service_id` to create/update the appointment.
    """
    # Use nested serializers for read-only representation
    client = UserSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)

    # Use a write-only field to accept the service ID during creation/update
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), source='service', write_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            'id', 'organization', 'client', 'service', 'service_id', 
            'date_time', 'status', 'notes', 'created_at', 'updated_at'
        ]
        # The client and organization are set in the view, not provided by the user
        read_only_fields = ('organization', 'client', 'created_at', 'updated_at')
