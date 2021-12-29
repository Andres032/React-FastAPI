from datetime import date
from pydantic import BaseModel

class Movie(BaseModel):
    nombre: str
    idioma: str
    estreno: date
    director: str
    sipnosis: str
    