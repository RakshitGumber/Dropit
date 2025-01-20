from fastapi import APIRouter
from .v1.v1 import v1

router = APIRouter()

router.include_router(v1)
router.include_router(v1, prefix="/v1")
