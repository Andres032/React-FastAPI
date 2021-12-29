from schemas.movie import Movie
from fastapi import APIRouter
from models.movie import movies
from config.db import conn
movie = APIRouter()

@movie.get('/')
async def fetch_movies():
    return conn.execute(movies.select()).fetchall()



@movie.get('/{id}')
async def fetch_movie(id: int):
    return conn.execute(movies.select().where(movies.c.id == id)).first()

@movie.post('/')
async def create_movie(movie: Movie):
    conn.execute(movies.insert().values(
        nombre= movie.nombre,
        idioma= movie.idioma,
        estreno= movie.estreno,
        director= movie.director,
        sipnosis = movie.sipnosis
    ))
    return conn.execute(movies.select()).fetchall()


@movie.put('/')
async def update_movie(id: int , movie: Movie):
    conn.execute(movies.update().values(
        nombre= movie.nombre,
        idioma= movie.idioma,
        estreno= movie.estreno,
        director= movie.director,
        sipnosis = movie.sipnosis
    ).where(movies.c.id == id))
    return conn.execute(movies.select()).fetchall()


@movie.delete('/{id}')
async def delete_movie(id: int):
    conn.execute(movies.delete().where(movies.c.id == id))
    return conn.execute(movies.select()).fetchall()





    