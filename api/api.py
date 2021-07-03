from flask import Flask
from flask_restful import Api, Resource
from flask_mongoengine import MongoEngine
import time

app = Flask(__name__, static_url_path="/", static_folder="../build")


@app.route("/")
def home():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


api = Api(app)


class Time(Resource):
    def get(self):
        return {"time": time.time()}


api.add_resource(Time, "/api/time")
