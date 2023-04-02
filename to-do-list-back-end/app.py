from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
import psycopg2

def authenticate(username, password):
    conn = psycopg2.connect("dbname=mydatabase user=myuser password=mypassword host=myhost")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
    row = cursor.fetchone()
    conn.close()

    if row and safe_str_cmp(row[2].encode('utf-8'), password.encode('utf-8')):
        return User(row[0], row[1], row[2])

def identity(payload):
    user_id = payload['identity']
    conn = psycopg2.connect("dbname=mydatabase user=myuser password=mypassword host=myhost")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return User(row[0], row[1], row[2])

class User:
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __str__(self):
        return f"User(id={self.id}, username={self.username})"

app = Flask(__name__)
api = Api(app)

app.config['SECRET_KEY'] = 'super-secret'
jwt = JWT(app, authenticate, identity)

parser = reqparse.RequestParser()
parser.add_argument('task')

class TodoList(Resource):
    @jwt_required()
    def get(self):
        conn = psycopg2.connect("dbname=mydatabase user=myuser password=mypassword host=myhost")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM todos WHERE user_id=%s", (current_identity.id,))
        rows = cursor.fetchall()
        conn.close()
        todos = [{'id': row[0], 'task': row[1]} for row in rows]
        return todos

    @jwt_required()
    def post(self):
        args = parser.parse_args()
        conn = psycopg2.connect("dbname=mydatabase user=myuser password=mypassword host=myhost")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO todos (task, user_id) VALUES (%s, %s) RETURNING id", (args['task'], current_identity.id))
        id = cursor.fetchone()[0]
        conn.commit()
        conn.close()
        return {'id': id, 'task': args['task']}

class TodoItem(Resource):
    @jwt_required()
    def get(self, todo_id):
        conn = psycopg2.connect("dbname=mydatabase user=myuser password=mypassword host=myhost")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM todos WHERE id=%s AND user_id=%s", (todo_id, current_identity.id))
        row = cursor.fetchone()
       
    @jwt_required()
    def put(self, todo_id):
        args = parser.parse_args()
        conn = psycopg2.connect("dbname=mydatabase user=myuser password=mypassword host=myhost")
        cursor = conn.cursor()
        cursor.execute("UPDATE todos SET task=%s WHERE id=%s AND user_id=%s", (args['task'], todo_id, current_identity.id))
        updated_rows = cursor.rowcount
        conn.commit()
        conn.close()
        if updated_rows == 0:
            return {'message': 'Todo not found'}, 404
        else:
            return {'message': 'Todo updated successfully'}

    @jwt_required()
    def delete(self, todo_id):
        conn = psycopg2.connect("dbname=mydatabase user=myuser password=mypassword host=myhost")
        cursor = conn.cursor()
        cursor.execute("DELETE FROM todos WHERE id=%s AND user_id=%s", (todo_id, current_identity.id))
        deleted_rows = cursor.rowcount
        conn.commit()
        conn.close()
        if deleted_rows == 0:
            return {'message': 'Todo not found'}, 404
        else:
            return {'message': 'Todo deleted successfully'}

api.add_resource(TodoList, '/todos')
api.add_resource(TodoItem, '/todos/<int:todo_id>')

if __name__ == '__main__':
    app.run(debug=True)

