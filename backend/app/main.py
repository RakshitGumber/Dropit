from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
import os


from dotenv import load_dotenv

load_dotenv()


app = FastAPI()

DATABASE_URL = os.environ["DATABASE_URL"]
app.add_middleware(DBSessionMiddleware, db_url=DATABASE_URL)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://dropit-kappa.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from .routers.route import router

app.include_router(router)
