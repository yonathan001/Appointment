from django.db import models
from organizations.models import Organization

class Service(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.DurationField(help_text="Duration of the service in HH:MM:SS format")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.organization.name})"
