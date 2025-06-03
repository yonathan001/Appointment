from django.db import models
from users.models import CustomUser

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration_minutes = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.name

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    
    client = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='client_appointments')
    staff = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='staff_appointments')
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.client.username} - {self.date} {self.time} - {self.status}"
    
    class Meta:
        ordering = ['-date', '-time']
