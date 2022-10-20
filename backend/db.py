from string import ascii_uppercase
import mysql.connector

from types_ import FlightInfo, SearchResult, SeatType, Ticket, CustomerData


db = mysql.connector.connect(
    host="11.0.8.15",
    user="bulat",
    password="password",
    database="tickets"
)

cursor = db.cursor()

a = cursor.callproc("SELECT_FLIGHTS", args=(
    "moskow", "irkutsk", None, None, None))
# results = [r.fetchall() for r in cursor.stored_results()]

# try:
#     cursor.callproc("add_customer", ("M", "Олег", "Евсютин",
#                                      None, None, "1983-01-02", "372hd"))
# except DatabaseError as e:
# print(e.msg)


def select_cities():
    cursor.execute("select name from cities")
    return [x[0] for x in cursor.fetchall()]
    # return list(map(lambda x: x[0], cursor.fetchall()))


def search_flights(query: dict):
    cursor.callproc("select_flights", args=(
        query.get("fromCity"), query.get("toCity"), query.get(
            "date-begin"), query.get("date-end"), query.get("price")
    ))
    tmp = [r.fetchall() for r in cursor.stored_results()]

    result = []
    columns = ["idflights", "planes_idplanes", "idpilot1", "idpilot2", "departure", "arrival",
               "booked_BC", "booked_ST", "num_seats_BC", "num_seats_ST", "city_to", "city_from", "basic_price"]
    for row in tmp[0]:
        result.append(
            SearchResult(
                row[columns.index("idflights")],
                row[columns.index("city_from")],
                row[columns.index("city_to")],
                row[columns.index("departure")],
                row[columns.index("arrival")],
                row[columns.index("basic_price")],
            )
        )

    return result


def search_user(login, password):
    cursor.execute(f"select find_login_and_password('{login}', '{password}')")
    return cursor.fetchone()[0]


def my_tickets(id_):
    cursor.callproc("tickets_of_passenger", (id_,))
    results = []
    tmp = [r.fetchall() for r in cursor.stored_results()]
    columns = ["price", "sit_row", "sit_number", "name", "BC_ST", "luggage_weight",
               "hand_luggage", "departure", "arrival", "city_to", "city_from"]
    for row in tmp[0]:
        results.append(
            Ticket(*row)
        )
    return results


def user_data(id_):
    cursor.callproc("get_customer_data", (id_,))
    tmp = [r.fetchall() for r in cursor.stored_results()]
    return CustomerData(*tmp[0][0]).__dict__


def flight_info_small(id_):
    cursor.callproc("get_flight_data_for_display", (id_,))
    tmp = [r.fetchall() for r in cursor.stored_results()]
    if not tmp:
        return FlightInfo(None, None, None, None).__dict__
    return FlightInfo(*tmp[0][0]).__dict__


def seat_types(id_):
    cursor.callproc("get_flight_sit_types", (id_,))
    tmp = [r.fetchall() for r in cursor.stored_results()]
    results = []
    for row in tmp[0]:
        results.append(SeatType(*row))
    return results


def available_places(flight_id, bcst):
    let = ascii_uppercase
    cursor.callproc("get_available_places", (flight_id, bcst,))
    print(flight_id, bcst)
    tmp = [r.fetchall() for r in cursor.stored_results()]
    results = []
    for row in tmp[0]:
        results.append(str(row[0]) + " " + let[row[1]-1])
    return results


def buy(sit_row, sit_number, idsit, idflight, idbuyer, idpassanger):
    cursor.callproc("add_ticket", (sit_row, sit_number,
                    idsit, idflight, idbuyer, idpassanger))
    db.commit()
