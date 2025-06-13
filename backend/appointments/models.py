from django.db import models
from django.conf import settings
from organizations.models import Organization
from services.models import Service

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='appointments')
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='appointments_as_client',
        limit_choices_to={'role': 'client'}
    )
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='appointments')
    date_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Appointment for {self.client.username} at {self.organization.name} on {self.date_time.strftime('%Y-%m-%d %H:%M')}"
