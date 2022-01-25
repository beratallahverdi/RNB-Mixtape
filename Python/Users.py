import json
import requests
import uuid
import base64


class User:
    _id = None
    username = ''
    password = ''
    first_name = ''
    last_name = ''
    email = ''
    user_id = ''
    phone_number = ''

    def __init__(self, json=None):
        if json is not None:
            self._id = json['_id']
            self.user_id = json['user_id'] if 'user_id' in json else self._id
            self.username = json['username'] if 'username' in json else ''
            self.first_name = json['first_name'] if 'first_name' in json else ''
            self.last_name = json['last_name'] if 'last_name' in json else ''
            self.email = json['email'] if 'email' in json else ''
            self.phone_number = json['phone_number'] if 'phone_number' in json else ''
        pass

    def get_user(self):
        response = requests.get(
            'https://is2zf3b1z3.execute-api.us-east-2.amazonaws.com/default/users?id={}'.format(
                self._id),
            headers={'x-api-key': 'RndMImQoFj2d3dRt4Qoa45AMYuPrD621likw82f4'}, json={
                '_id': self._id,
            })
        user = response.json()['Item']
        self.user_id = user['user_id'] if 'user_id' in user else self._id
        self.username = user['username'] if 'username' in user else ''
        self.first_name = user['first_name'] if 'first_name' in user else ''
        self.last_name = user['last_name'] if 'last_name' in user else ''
        self.email = user['email'] if 'email' in user else ''
        self.phone_number = user['phone_number'] if 'phone_number' in user else ''
        return self

    def get_users(self) -> list:
        response = requests.get(
            'https://is2zf3b1z3.execute-api.us-east-2.amazonaws.com/default/users', headers={
                'x-api-key': 'RndMImQoFj2d3dRt4Qoa45AMYuPrD621likw82f4',
            }, json={})
        return [User(json=user) for user in response.json()['Items']]

    def create_user(self) -> dict:
        response = requests.post(
            'https://is2zf3b1z3.execute-api.us-east-2.amazonaws.com/default/users', headers={
                'x-api-key': 'RndMImQoFj2d3dRt4Qoa45AMYuPrD621likw82f4',
                'Content-Type': 'application/json',
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, sdch",
                "Accept-Language": "en-US,en;q=0.8",
            }, json={
                '_id': self._id,
                'username': self.username,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'email': self.email,
                'phone_number': self.phone_number,
                'user_id': self.user_id
            })
        return response.json()

    def update_user(self, data: dict) -> dict:
        response = requests.put(
            'https://is2zf3b1z3.execute-api.us-east-2.amazonaws.com/default/users', headers={
                'x-api-key': 'RndMImQoFj2d3dRt4Qoa45AMYuPrD621likw82f4',
            }, json={
                '_id': self._id,
                'username': data['username'] if 'username' in data else self.username,
                'first_name': data['first_name'] if 'first_name' in data else self.first_name,
                'last_name':    data['last_name'] if 'last_name' in data else self.last_name,
                'email': data['email'] if 'email' in data else self.email,
                'phone_number': data['phone_number'] if 'phone_number' in data else self.phone_number,
                'user_id': data['user_id'] if 'user_id' in data else self.user_id
            })
        return response.json()

    def delete_user(self) -> dict:
        response = requests.delete(
            'https://is2zf3b1z3.execute-api.us-east-2.amazonaws.com/default/users', headers={
                'x-api-key': 'RndMImQoFj2d3dRt4Qoa45AMYuPrD621likw82f4',
                'Content-Type': 'application/json',
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, sdch",
                "Accept-Language": "en-US,en;q=0.8",
            }, json={'_id': self._id})
        return response.json()


user = User()
users = user.get_users()
updatedUser = users[1]
updatedUser.update_user({'username': 'testDeneme'})
print(updatedUser.get_user().username)
