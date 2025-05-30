from typing import Optional

from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Field, SQLModel, Session, create_engine, select

import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = "postgresql://neondb_owner:nsVS6jxAI2Pw@ep-weathered-fog-a4dwgj3a-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

engine = create_engine(DATABASE_URL, echo=True)


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, nullable=False, unique=True)
    email: str = Field(nullable=False, unique=True)
    is_active: bool = Field(default=True)


# Dependency


def get_session():
    with Session(engine) as session:
        yield session


# FastAPI app
app = FastAPI()


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


@app.get("/")
def root_route():
    return {"Ping": "Pong"}


@app.post("/users/", response_model=User)
def create_user(user: User, session: Session = Depends(get_session)):
    db_user = session.exec(select(User).where(User.username == user.username)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
