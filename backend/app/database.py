from sqlmodel import Field, SQLModel, Session, create_engine, select
from app.config import DATABASE_URL

if DATABASE_URL == None:
    raise

engine = create_engine(DATABASE_URL, echo=True)


def get_session():
    with Session(engine) as session:
        yield session
