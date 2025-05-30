from fastapi import FastAPI
from sqlmodel import SQLModel

from app.database import engine
from app.routes import user as user_routes

app = FastAPI()


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


@app.get("/")
def root_route():
    return {"Ping": "Pong"}


app.include_router(user_routes.router)
