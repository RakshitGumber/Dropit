from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session

from app.models.user import User
from app.database import get_session

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=User)
def create_user(user: User, session: Session = Depends(get_session)):
    db_user = session.exec(select(User).where(User.username == user.username)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.get("/{user_id}", response_model=User)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
