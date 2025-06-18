from fastapi import APIRouter

from app.routes.api.v0 import auth
from app.routes.api.v0 import flow
from app.routes.api.v0 import pipelines
from app.routes.api.v0 import earlyuser

router = APIRouter()


router.include_router(auth.router, prefix="/auth")
router.include_router(flow.router, prefix="/flow")
router.include_router(earlyuser.router, prefix="/join")
router.include_router(pipelines.pipelines)


@router.get("/")
def api_route():
    return {"message": "Hello! from v0"}
