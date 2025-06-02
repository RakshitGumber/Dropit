from fastapi import FastAPI
from pydantic import BaseModel
from sqlmodel import SQLModel

from app.database import engine
from app.routes import user as user_routes

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


@app.get("/")
def root_route():
    return {"Ping": "Pong"}


app.include_router(user_routes.router)
