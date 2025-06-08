from fastapi import APIRouter

from app.routes.api.v0 import auth
from app.routes.api.v0 import flow

router = APIRouter()


router.include_router(auth.router, prefix="/auth")
router.include_router(flow.router, prefix="/flow")


@router.get("/")
def api_route():
    return {"message": "Hello! from v0"}
