from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root_route():
    return {"message": "Hello! from Rakshit. 👋🏻"}
