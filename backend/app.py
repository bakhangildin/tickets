from datetime import datetime, tzinfo
from flask import Flask, request, make_response
from flask_cors import CORS
from types_ import SearchResult
import pytz

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/api/cities", methods=["GET"])
def cities():
    cities = ["Москва", "Биробиджан", "Екатеринбург", "Елизово"]
    response = make_response({"cities": cities})
    return response


@app.route("/api/search", methods=["POST"])
def search():
    tz = pytz.timezone("Europe/Moscow")

    formData = {
        "fromCity": request.form.get("fromCity"),
        "toCity": request.form.get("toCity"),
        "date-begin": request.form.get("date-begin"),
        "date-end": request.form.get("date-end")
    }
    results = [
        SearchResult(id=1, fromCity="City 1", toCity="City 2", date=datetime(
            1000, 10, 1, 14, 8, tzinfo=tz), price=12000),
        SearchResult(id=2, fromCity="City 2", toCity="City 3",
                     date=datetime.now(tz), price=13000),
        SearchResult(id=3, fromCity="City 3", toCity="City 4",
                     date=datetime.now(tz), price=14000),
        SearchResult(id=4, fromCity="City 4", toCity="City 5",
                     date=datetime.now(tz), price=15000),
        SearchResult(id=5, fromCity="City 5", toCity="City 6",
                     date=datetime.now(tz), price=16000),
    ]

    # response = make_response({"fromData": formData})
    response = make_response({"results": results})
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8000", debug=False)
