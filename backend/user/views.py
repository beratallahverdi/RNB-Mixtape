import re
import json
from django.http import HttpResponse
from rnbusers import RNBUser
def index(request):
    if request.method == 'GET':
        return HttpResponse(",".join([str(user.first_name+" "+user.last_name+" "+user._id) for user in RNBUser().get_users()]))
    elif request.method == 'POST':
        userJson = json.loads(request.body)
        print(userJson)
        try:
            user = RNBUser(userJson['data']).create_user()
            return HttpResponse(user)
        except ValueError:
            print("Value Erorr")
        return HttpResponse("POST Geldi baba")
    else:
        return HttpResponse('Diger methodlar')

def home(request):
    if request.method == 'GET':
        return HttpResponse("Hello, world. You're at the polls index.")
    elif request.method == 'POST':
        return HttpResponse("POST Geldi baba")
    else:
        return HttpResponse("Digerleri")