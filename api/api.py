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
    first_name = db.StringField()
    last_name = db.StringField()
    age = db.IntField()
    email = db.StringField()
    registration_date = db.DateTimeField()


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
    def get(self, id):
        """
        Query a specifc registrant by its registrantId
        """

        args = parser.parse_args()
        registrant = Registrant.objects(registrantId=id).first()

        if not registrant:
            return jsonify({"error": "data not found"})
        else:
            return jsonify(registrant)

    def put(self, id):
        """
        Update a specific registrant by its registrantId
        """

        args = parser.parse_args()
        args = {k: v for k, v in args.items() if v is not None}

        registrant = Registrant.objects(registrantId=id).first()

        if not registrant:
            return jsonify({"error": "data not found"})
        else:
            registrant.update(**args)

            return jsonify(Registrant.objects(registrantId=id).first())

    def delete(self, id):
        """
        Delete a specific registrant by its registrantId
        """

        args = parser.parse_args()
        registrant = Registrant.objects(registrantId=id).first()

        if not registrant:
            return jsonify({"error": "data not found"})
        else:
            return jsonify(registrant.delete())


class RegistantListAPI(Resource):
    def get(self):
        """
        Get a list of all registrants
        """

        args = parser.parse_args()
        return jsonify(Registrant.objects.all())

    def post(self):
        """
        Create a new registrant
        """

        args = parser.parse_args()
        registrant = Registrant(
            registrantId=Registrant.objects.count() + 1,
            first_name=args["first_name"],
            last_name=args["last_name"],
            age=args["age"],
            email=args["email"],
            registration_date=args["registration_date"],
        )

        return jsonify(registrant.save())


api.add_resource(RegistrantAPI, "/api/registrant/<int:id>")
api.add_resource(RegistantListAPI, "/api/registrants")
