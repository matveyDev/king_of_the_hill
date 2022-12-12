import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from settings import ORIGINS
from database.schemas import User as UserSchema
from database.mongodb import MongodbAPI


app = FastAPI()
mongodb = MongodbAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/add_user', response_model=UserSchema)
async def add_user(address: str):
    if mongodb.check_user_exists(address) is True:
        raise Exception('User allready exists')

    mongodb.add_user(address)
    user = mongodb.top_users.find_one({'address': address})

    return UserSchema(**user)


@app.patch('/add_prize', response_model=UserSchema)
async def add_prize(address: str, prize: float):
    mongodb.add_prize_to_user(address, prize)
    user = mongodb.top_users.find_one({'address': address})

    return UserSchema(**user)


@app.get('/users_by', response_model=list[UserSchema])
async def get_users_by(field: str, order_by: int = -1, limit: int = 5):
    users = mongodb.get_users_by(
        field=field,
        order_by=order_by,
        limit=limit
    )
    return users


if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='0.0.0.0')
