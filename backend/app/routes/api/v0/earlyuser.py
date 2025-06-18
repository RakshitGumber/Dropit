from venv import logger
from fastapi import APIRouter, Depends, HTTPException
from app.models.earlyusers import EarlyUser
from app.database import get_session
from sqlmodel import Session


router = APIRouter(tags=["early-users"])


@router.post("/")
def join_user(user: EarlyUser, session: Session = Depends(get_session)):
    logger.info(f"Creating user: {user.username}")
    try:
        new_user = EarlyUser(username=user.username, email=user.email)

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
