from crypt import methods
from datetime import datetime
from flask import Flask, request, make_response
from flask_cors import CORS
from types_ import SearchResult
import pytz
from enum import Enum
# from db import cursor, select_cities


class API(Enum):
    cities = "/api/cities"
    search = "/api/search"
    flightInfo = "/api/flight-info"
    buy = "/api/buy"


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route(API.cities.value, methods=["GET"])
def cities():
    # cities = select_cities()
    cities = ["Омск", "Москва", "Казань"]
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
        "rice": None if request.form.get("price") == "" else request.form.get("price")

    }

    results = [
        SearchResult(id=1, fromCity="City 1", toCity="City 2", date=datetime(
            1000, 10, 1, 14, 8, tzinfo=tz), minPrice=12000),
        SearchResult(id=2, fromCity="City 2", toCity="City 3",
                     date=datetime.now(tz), minPrice=13000),
        SearchResult(id=3, fromCity="City 3", toCity="City 4",
                     date=datetime.now(tz), minPrice=14000),
        SearchResult(id=4, fromCity="City 4", toCity="City 5",
                     date=datetime.now(tz), minPrice=15000),
        SearchResult(id=5, fromCity="City 5", toCity="City 6",
                     date=datetime.now(tz), minPrice=16000),
    ]

    # response = make_response({"fromData": formData})
    response = make_response({"results": results})
    return response


@app.route(API.flightInfo.value, methods=["POST"])
def flight():

    id = request.json.get("id")
    print(id)
    if id is None:
        return make_response({
            "success": False,
            "message": "Нет id полета в теле запроса"
        })

    response = make_response({
        "success": True,
        "id": id,
    })
    return response


@app.route(API.buy.value, methods=["POST"])
def buy():
    response = make_response({
        "success": True,
        "id": request.json.get("id")
    })
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8000", debug=False)
