from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from app.models.flow import Flow  # Create this model
from app.database import get_session
from app.models.user import User

router = APIRouter(tags=["flows"])


def get_current_user(session: Session = Depends(get_session)) -> User:
    # Dummy implementation: replace with real authentication logic
    user = session.query(User).first()
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


@router.post("/")
def save_flow(
    flow: Flow,
    session: Session = Depends(get_session),
):
    session.add(flow)
    session.commit()
    session.refresh(flow)
    return {"id": flow.id}


@router.get("/{flow_id}")
def get_flow(flow_id: UUID, session: Session = Depends(get_session)):
    flow = session.get(Flow, flow_id)
    if not flow:
        raise HTTPException(status_code=404, detail="User not found")
    return flow


@router.get("/getFlows")
def get_user_flows(
    user_id: UUID = Query(...),
    session: Session = Depends(get_session),
):
    statement = select(Flow).where(Flow.user_id == user_id)
    flows = session.exec(statement).all()

    if not flows:
        raise HTTPException(status_code=404, detail="No flows found for this user")

    return flows
