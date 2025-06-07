from fastapi import APIRouter

from app.routes.api.v0 import v0

router = APIRouter()

router.include_router(v0.router, prefix="/v0")
router.include_router(v0.router)


@router.get("/")
def root_route():
    return {"message": "Hello! from API"}
