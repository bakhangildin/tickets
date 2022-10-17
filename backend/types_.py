from dataclasses import dataclass
from datetime import datetime


@dataclass
class SearchResult:
    id: int
    fromCity: str
    toCity: str
    date: datetime
    minPrice: int
