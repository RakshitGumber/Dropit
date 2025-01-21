from fastapi import APIRouter

root_route = APIRouter()

@root_route.get("/")
async def root():
    return {"message": "Hello World from v1"}
