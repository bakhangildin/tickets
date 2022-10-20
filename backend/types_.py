from dataclasses import dataclass
from datetime import datetime


@dataclass
class SearchResult:
    id: int
    fromCity: str
    toCity: str
    arrival: datetime
    departure: datetime
    minPrice: int


@dataclass
class LoginData:
    id: int = None
    request_success: bool = False
    error_message: str = "Default value"
    login: str = ""
    password: str = ""
    type: str = ""
    isLogin: bool = False


@dataclass
class Ticket:
    price: int
    sit_row: int
    sit_number: int
    name: str
    BC_ST: str
    luggage_weight: float
    hand_luggage: float
    departure: datetime
    arrival: datetime
    city_to: str
    city_from: str


@dataclass
class CustomerData:
    idcustomers: int
    sex: str
    name: str
    surname: str
    passport_number: int
    passport_series: int
    date_of_birth: datetime
    birth_sertificate: str
    password: str
    login: str


@dataclass
class FlightInfo:
    city_from: str
    city_to: str
    departure: datetime
    arrival: datetime


@dataclass
class SeatType:
    id_seats: int
    name: str
    BC_ST: str
    luggage_weight: float
    hand_luggage: float
    price: float
