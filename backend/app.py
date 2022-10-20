from datetime import date, datetime
from unittest import result
from flask import Flask, request, make_response
from flask_cors import CORS
from types_ import SearchResult, LoginData
import pytz
from enum import Enum
from mysql.connector.errors import DatabaseError
import db


class API(Enum):
    cities = "/api/cities"
    search = "/api/search"
    flightInfoSm = "/api/flight-info-small"
    flightInfoLg = "/api/flight-info-large"
    buy = "/api/buy"
    login = "/api/login"
    myTickets = "/api/my-tickets"
    account = "/api/account"
    seatTypes = "/api/seat-types"
    avaliablePlaces = "/api/avaliable-places"


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route(API.cities.value, methods=["GET"])
def cities():
    cities = db.select_cities()
    response = make_response({"cities": cities})
    return response


@app.route(API.search.value, methods=["POST"])
def search():
    tz = pytz.timezone("Europe/Moscow")

    formData = {
        "fromCity": request.form.get("fromCity"),
        "toCity": request.form.get("toCity"),
        "date-begin": None if request.form.get("date-begin") == "" else request.form.get("date-begin"),
        "date-end": None if request.form.get("date-end") == "" else request.form.get("date-end"),
        "price": None if request.form.get("price") == "" else request.form.get("price")
    }
    results = db.search_flights(formData)
    response = make_response({"results": results})
    return response


@app.route(API.flightInfoSm.value, methods=["POST"])
def flight_info():
    if request.json.get("id"):
        id = int(request.json.get("id"))
        res = db.flight_info_small(id)
        return res
    return db.flight_info_small(0)


@app.route(API.buy.value, methods=["POST"])
def buy():
    try:
        db.buy(*request.json.values())
        return make_response({"success": True})
    except:
        return make_response({"success": False})


@app.route(API.login.value, methods=["POST"])
def login():
    try:
        formData = {
            "login": request.form.get(key="login"),
            "password": request.form.get(key="password")
        }
        id = db.search_user(formData["login"], formData["password"])
        if id == 0:
            errLogin = LoginData(
                request_success=True,
                error_message="",
                login=formData.get("login"),
                password=formData.get("password"),
                isLogin=False
            )
            return make_response(errLogin.__dict__)
        else:
            okLogin = LoginData(
                id=id,
                request_success=True,
                error_message="",
                login=formData.get("login"),
                password=formData.get("password"),
                type="client",
                isLogin=True
            )
            return make_response(okLogin.__dict__)
    except DatabaseError as e:
        err = LoginData(
            request_success=False,
            error_message=e.msg,
            login=formData.get("login"),
            password=formData.get("password"),
            isLogin=False
        )
        return make_response(err.__dict__)


@app.route(API.myTickets.value, methods=["POST"])
def my_tickets():
    results = db.my_tickets(request.json.get('id'))
    return make_response({"tickets": results})


@app.route(API.account.value, methods=["POST"])
def account():
    return db.user_data(request.json.get("id"))


@app.route(API.seatTypes.value, methods=["POST"])
def seat_types():
    id_ = int(request.json.get("id"))
    return make_response(db.seat_types(id_))


@app.route(API.avaliablePlaces.value, methods=["POST"])
def available_places():
    res = db.available_places(request.json.get(
        "flight_id"), request.json.get("BC_ST"))
    return make_response(res)


if __name__ == "__main__":
    try:
        app.run(host="0.0.0.0", port="8000", debug=False)
    finally:
        print("Closing db connection")
        db.cursor.close()
