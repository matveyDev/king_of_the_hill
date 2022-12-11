from fastapi import FastAPI

from database.schemas import User as UserSchema
from database.mongodb import MongodbAPI

app = FastAPI()
mongodb = MongodbAPI()


@app.get('/users_by', response_model=list[UserSchema])
async def get_users_by(field: str, limit: int):
    users = mongodb.get_users_by(
        field=field,
        order_by=-1,
        limit=limit
    )
    return users
