from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["auth"])


class CreateUser(BaseModel):
    username: str
    password: str
    email: str


@router.post("/signup")
def signup_user():
    return
