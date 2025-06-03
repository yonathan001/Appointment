from rest_framework import serializers
from .models import Appointment, Service
from users.serializers import UserSerializer

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    client_details = UserSerializer(source='client', read_only=True)
    staff_details = UserSerializer(source='staff', read_only=True)
    service_details = ServiceSerializer(source='service', read_only=True)
    
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('created_at',)
    
    def validate(self, data):
        # Ensure client is a client
        if data.get('client') and data['client'].role != 'client':
            raise serializers.ValidationError("Selected user is not a client")
        
        # Ensure staff is a staff member
        if data.get('staff') and data['staff'].role != 'staff':
            raise serializers.ValidationError("Selected user is not a staff member")
        
        return data
