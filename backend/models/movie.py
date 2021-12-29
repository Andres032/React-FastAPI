from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Date, Integer, String
from config.db import meta, engine

movies = Table('movie', meta,
 Column('id', Integer, primary_key=True),
 Column('nombre', String (255)),
 Column('idioma', String (255)),
 Column('estreno', Date),
 Column('director',String (255)),
 Column('sipnosis', String (255)),
 
)
meta.create_all(engine)