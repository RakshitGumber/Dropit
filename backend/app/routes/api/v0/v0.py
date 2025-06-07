from fastapi import APIRouter

from app.routes.api.v0 import auth

router = APIRouter()


router.include_router(auth.router, prefix="/auth")


@router.get("/")
def api_route():
    return {"message": "Hello! from v0"}
