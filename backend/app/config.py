import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")

if DATABASE_URL == None:
    raise ValueError("DATABASE_URL environment variable not set")
