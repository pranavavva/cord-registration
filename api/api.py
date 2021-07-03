from flask import Flask
from flask_restful import Api, Resource
import time

app = Flask(__name__)
api = Api(app)

class Time(Resource):
    def get(self):
        return {"time": time.time()}

api.add_resource(Time, "/api/time")