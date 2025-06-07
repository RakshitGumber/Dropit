from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select


from app.database import get_session
from app.logger import logger
from app.models.user import User
from app.utils.auth import create_access_token, hash_password, verify_password

router = APIRouter(tags=["auth"])


class CreateUser(BaseModel):
    username: str
    password: str
    email: str


@router.get("/signup")
def auth_root():
    return {"Message": "Hello"}


@router.post("/signup")
def signup_user(user: CreateUser, session: Session = Depends(get_session)):
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


class LoginUser(BaseModel):
    email: str
    password: str


# Add logging and try except
@router.post("/login")
def login(user: LoginUser, session: Session = Depends(get_session)):
    db_user = session.exec(select(User).where(User.email == user.email)).first()
    if not db_user or not verify_password(user.password, db_user.password_hashed):
        raise HTTPException(status_code=401, detail="Invalid creds")
    return {"access_token": create_access_token({"sub": user.email})}


@router.get("/{user_id}", response_model=User)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
