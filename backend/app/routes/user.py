from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import select, Session
from passlib.context import CryptContext

from app.logger import logger


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
    logger.info(f"Creating user: {user.username}")

    db_user = session.exec(select(User).where(User.username == user.username)).first()
    if db_user:
        logger.warning(f"Username '{user.username}' already exists.")
        raise HTTPException(status_code=400, detail="Username already registered")

    try:
        hashed_password = hash_password(user.password)
        new_user = User(
            username=user.username, email=user.email, password_hashed=hashed_password
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        logger.info(f"User created successfully: {new_user.username}")
        return new_user

    except Exception as e:
        logger.exception(f"Unexpected error while creating user: {str(e)}")
        raise HTTPException(
            status_code=500, detail="An error occurred while creating the user."
        )


@router.get("/{user_id}", response_model=User)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
