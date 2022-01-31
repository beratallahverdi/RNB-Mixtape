from time import time
from django.db import models

class User(models.Model):
    _id = models.CharField(max_length=200,primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=256)
    first_name = models.CharField(max_length=140)
    last_name = models.CharField(max_length=140)
    email = models.CharField(max_length=140)
    user_id = models.IntegerField(max_length=140)
    phone_number = models.CharField(max_length=20)
    question_text = models.CharField(max_length=200)
    created_at = models.IntegerField('date created', default=time())
    updated_at = models.IntegerField('date updated', default=time())
