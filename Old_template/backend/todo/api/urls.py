from django.urls import path, include
from .views import (
    TodoListApiView,
    TodoApiView,
)

urlpatterns = [
    path('todo', TodoApiView.as_view()),
    path('list', TodoListApiView.as_view()),
]
