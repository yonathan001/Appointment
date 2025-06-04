from rest_framework import serializers
from .models import Appointment
from users.models import CustomUser
from services.models import Service
from users.serializers import UserSerializer
from services.serializers import ServiceSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    # Fields for writing (accepting IDs)
    client = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all()
        # In a ViewSet, this would often be set to request.user automatically on create
    )
    staff = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='staff'),
        allow_null=True,
        required=False
    )
    service = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all()
    )

    # Fields for reading (providing nested object details)
    # These use the serializers we defined earlier.
    client_details = UserSerializer(source='client', read_only=True)
    staff_details = UserSerializer(source='staff', read_only=True)
    service_details = ServiceSerializer(source='service', read_only=True)

    class Meta:
        model = Appointment
        fields = (
            'id',
            'client',           # For write operations (expects client ID)
            'staff',            # For write operations (expects staff ID)
            'service',          # For write operations (expects service ID)
            'client_details',   # For read operations (nested client object)
            'staff_details',    # For read operations (nested staff object)
            'service_details',  # For read operations (nested service object)
            'date',
            'time',
            'status',
            'notes'
        )
