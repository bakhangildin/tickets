from datetime import datetime
from typing import List
import mysql.connector
from mysql.connector.errors import DatabaseError


db = mysql.connector.connect(
    host="11.0.8.15",
    user="bulat",
    password="password",
    database="tickets"
)

cursor = db.cursor()

# cursor.callproc("SELECT_FLIGHTS", args=("almetievsk", "irkutsk", None, None, None))
try:
    cursor.callproc("add_customer", ("M", "Олег", "Евсютин",
                                     None, None, "1983-01-02", "372hd"))
except DatabaseError as e:
    print(e.msg)


def select_cities():
    cursor.execute("select name from cities")
    return [x[0] for x in cursor.fetchall()]
    # return list(map(lambda x: x[0], cursor.fetchall()))
