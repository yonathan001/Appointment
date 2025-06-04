from django.db import models
from django.conf import settings
from services.models import Service

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    client = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='client_appointments', on_delete=models.CASCADE)
    staff = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='staff_appointments', null=True, blank=True, on_delete=models.SET_NULL)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Appointment for {self.client.username} with {self.staff.username if self.staff else 'N/A'} for {self.service.name} on {self.date} at {self.time}"
