from django.urls import path, include

urlpatterns = [
    path('', include('todo.api.urls')),
]
