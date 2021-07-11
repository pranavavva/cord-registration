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
    registrantId = db.IntField()
    firstName = db.StringField()
    lastName = db.StringField()
    age = db.IntField()
    email = db.StringField()
    registrationDate = db.DateTimeField()
    meta = {"collection": "registrants"}


api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument("firstName", type=str, required=False)
parser.add_argument("lastName", type=str, required=False)
parser.add_argument("age", type=int, required=False)
parser.add_argument("email", type=str, required=False)
parser.add_argument(
    "registrationDate",
    type=lambda date: datetime.date.fromisoformat(date),
    required=False,
)


class RegistrantAPI(Resource):
    def get(self, registrantId: int):
        """
        Query a specifc registrant by its registrantId
        """

        registrant = Registrant.objects(registrantId=registrantId).first()

        if not registrant:
            return {}, 404
        else:
            return jsonify(registrant)

    def put(self, registrantId: int):
        """
        Update a specific registrant by its registrantId
        """

        args = {k: v for k, v in parser.parse_args().items() if v is not None}

        registrant = Registrant.objects(registrantId=registrantId).first()

        if not registrant:
            return {}, 404
        else:
            registrant.update(**args)
            return {}

    def delete(self, registrantId: int):
        """
        Delete a specific registrant by its registrantId
        """

        registrant = Registrant.objects(registrantId=registrantId).first()

        if not registrant:
            return {}, 404
        else:
            jsonify(registrant.delete())
            return {}


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
        registrant = Registrant(registrantId=Registrant.objects.order_by("-registrantId").first().registrantId + 1, **args)
        return jsonify(registrant.save())


api.add_resource(RegistrantAPI, "/api/registrants/<int:registrantId>")
api.add_resource(RegistantListAPI, "/api/registrants")
