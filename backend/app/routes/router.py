from fastapi import APIRouter

from app.routes import root_route
from app.routes.api import api

main_router = APIRouter()

main_router.include_router(root_route.router)
main_router.include_router(api.router, prefix="/api")
