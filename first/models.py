from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver


# Create your models here.
class cp_coder(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=True)
    handle = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.name
