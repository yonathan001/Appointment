from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('system_admin', 'System Admin'),
        ('organization_admin', 'Organization Admin'),
        ('client', 'Client'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')

    def __str__(self):
        return self.username

