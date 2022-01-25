from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from todo.models import Todo, TodoList
from .serializers import TodoSerializer, TodoListSerializer
from todo.api import serializers


class TodoApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the todo items for given requested user
        '''
        todos = Todo.objects.filter(created_by=request.user.id)
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create the Todo with given todo data
        '''
        data = {
            'uuid': request.data.get('uuid'),
            'description': request.data.get('description'),
            'due_date': "2021-12-23",
        }
        todoList = TodoList.objects.get(uuid=request.data.get('listUUID'))
        serializer = TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save(created_by=self.request.user, list_id=todoList.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 3. Update
    def put(self, request, *args, **kwargs):
        '''
        Create the Todo with given todo data
        '''
        todo = Todo.objects.get(uuid=request.data.get('uuid'))
        data = {
            'description': request.data.get('description') if request.data.get('description') is not None else todo.description,
            'due_date': request.data.get('due_date') if request.data.get('due_date') is not None else todo.due_date,
            'completed': request.data.get('complete') if request.data.get('complete') is not None else todo.completed,
        }
        serializer = TodoSerializer(todo, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 4. Delete
    def delete(self, request, *args, **kwargs):
        '''
        Delete the Todo with given uuid
        '''
        todo = Todo.objects.get(uuid=request.data.get('uuid'))
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TodoListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the todo items for given requested user
        '''
        todoList = TodoList.objects.filter(created_by=request.user.id)
        serializer = TodoListSerializer(todoList, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create the Todo with given todo data
        '''
        data = {
            'title': request.data.get('title'),
            'uuid': request.data.get('uuid'),
        }
        serializer = TodoListSerializer(data=data)
        if serializer.is_valid():
            serializer.save(created_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 2. Update
    def put(self, request, *args, **kwargs):
        '''
        Create the Todo with given todo data
        '''
        todoList = TodoList.objects.get(uuid=request.data.get('uuid'))
        data = {
            'title': request.data.get('title') if request.data.get('title') is not None else todoList.title,
        }
        serializer = TodoListSerializer(todoList, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 4. Delete
    def delete(self, request, *args, **kwargs):
        '''
        Delete the Todo with given uuid
        '''
        todoList = TodoList.objects.get(uuid=request.data.get('uuid'))
        todoList.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
