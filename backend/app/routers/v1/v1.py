from fastapi import APIRouter

from .pipelines.pipelines import pipelines
from .root_route import root_route

v1 = APIRouter()

v1.include_router(root_route)
v1.include_router(pipelines, prefix="/pipelines")
