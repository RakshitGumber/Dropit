from fastapi import APIRouter
from fastapi_sqlalchemy import db


from app.schemas.user_schema import User
from app.models.users import User as UserModel

auth_route = APIRouter()


@auth_route.get("/")
async def get_users():
    return {"users": db.session.query(UserModel).all()}


@auth_route.post("/")
async def create_user(user: User):
    db_user = UserModel(id=1, name=user.name, email=user.email)
    db.session.add(db_user)
    db.session.commit()
    return {"user": db_user}
