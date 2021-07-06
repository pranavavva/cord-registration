import datetime
import os
from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from flask_mongoengine import MongoEngine


app = Flask(__name__, static_url_path="/", static_folder="../build")

app.config["MONGODB_SETTINGS"] = {"host": os.environ["DATABASE_URL"]}


@app.route("/")
def home():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


db = MongoEngine()
db.init_app(app)


class Registrant(db.Document):
    registrant_id = db.IntField()
    first_name = db.StringField()
    last_name = db.StringField()
    age = db.IntField()
    email = db.StringField()
    registration_date = db.DateTimeField()
    meta = {
        "collection": "registrants"
    }


api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument("first_name", type=str, required=False)
parser.add_argument("last_name", type=str, required=False)
parser.add_argument("age", type=int, required=False)
parser.add_argument("email", type=str, required=False)
parser.add_argument(
    "registration_date",
    type=lambda date: datetime.date.fromisoformat(date),
    required=False,
)


class RegistrantAPI(Resource):
    def get(self, registrant_id: int):
        """
        Query a specifc registrant by its registrant_id
        """

        registrant = Registrant.objects(registrant_id=registrant_id).first()

        if not registrant:
            return {}, 404
        else:
            return jsonify(registrant)

    def put(self, registrant_id: int):
        """
        Update a specific registrant by its registrant_id
        """

        args = {k: v for k, v in parser.parse_args().items() if v is not None}

        registrant = Registrant.objects(registrant_id=registrant_id).first()

        if not registrant:
            return {}, 404
        else:
            registrant.update(**args)
            return {}, 204

    def delete(self, registrant_id: int):
        """
        Delete a specific registrant by its registrant_id
        """

        registrant = Registrant.objects(registrant_id=registrant_id).first()

        if not registrant:
            return {}, 404
        else:
            return jsonify(registrant.delete())


class RegistantListAPI(Resource):
    def get(self):
        """
        Get a list of all registrants
        """

        return jsonify(Registrant.objects.all())

    def post(self):
        """
        Create a new registrant
        """

        args = parser.parse_args()
        registrant = Registrant(registrant_id=Registrant.objects.count() + 1, **args)

        return jsonify(registrant.save())


api.add_resource(RegistrantAPI, "/api/registrant/<int:registrant_id>")
api.add_resource(RegistantListAPI, "/api/registrants")
