from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import select, Session
from passlib.context import CryptContext

from app.models.user import User
from app.database import get_session

router = APIRouter(prefix="/users", tags=["Users"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


class CreateUser(BaseModel):
    username: str
    password: str
    email: str


@router.post("/", response_model=User)
def create_user(user: CreateUser, session: Session = Depends(get_session)):
    db_user = session.exec(select(User).where(User.username == user.username)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    existing_email = session.exec(select(User).where(User.email == user.email)).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    new_user = User(
        username=user.username, email=user.email, password_hashed=hashed_password
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user


@router.get("/{user_id}", response_model=User)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
