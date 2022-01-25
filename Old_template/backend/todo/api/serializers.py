from rest_framework import serializers
from todo.models import Todo, TodoList


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id", "list", "uuid", "description", "due_date", "completed",
                  "created_at", "updated_at", "created_by"]
        depth = 1


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ["id", "uuid", "title", "created_at",
                  "updated_at", "todo_list", "created_by"]
        depth = 1
