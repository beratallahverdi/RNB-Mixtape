from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation


class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.CharField(
        max_length=36, blank=True, null=True)
    list = models.ForeignKey(
        'TodoList', null=True, on_delete=models.DO_NOTHING, related_name='todo_list')
    list_order = models.IntegerField(default=0)
    description = models.CharField(max_length=180)
    due_date = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False, blank=True)
    created_by = models.ForeignKey(
        'auth.User', on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.task


class TodoList(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=180)
    uuid = models.CharField(
        max_length=36, blank=True, null=True)
    created_by = models.ForeignKey(
        'auth.User', on_delete=models.CASCADE, blank=True, null=True, related_name='created_by')
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    todo_list = GenericRelation(Todo)

    def __str__(self):
        return self.title
