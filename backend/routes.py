from fastapi import APIRouter

from database.mongodb import MongodbAPI
from database.schemas import User as UserSchema


mongodb = MongodbAPI()

router = APIRouter(
    prefix='/api/v1',
)


@router.post('/add_user', response_model=UserSchema)
async def add_user(address: str):
    if mongodb.check_user_exists(address) is True:
        raise Exception('User allready exists')

    mongodb.add_user(address)
    user = mongodb.top_users.find_one({'address': address})

    return UserSchema(**user)

@router.patch('/add_prize', response_model=UserSchema)
async def add_prize(address: str, prize: float):
    mongodb.add_prize_to_user(address, prize)
    user = mongodb.top_users.find_one({'address': address})

    return UserSchema(**user)

@router.get('/users_by', response_model=list[UserSchema])
async def get_users_by(field: str, order_by: int = -1, limit: int = 5):
    users = mongodb.get_users_by(
        field=field,
        order_by=order_by,
        limit=limit
    )
    return users
