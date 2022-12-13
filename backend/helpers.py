import random

from database.mongodb import MongodbAPI
from database.schemas import User as UserSchema


mongodb = MongodbAPI()


def add_extra_users_to_db():
    new_users: list[UserSchema] = [
        {'address': f'0x{random.randint(1*10**39, 9*10**39)}',
         'total_prizes': i}
        for i in range(1, 6)
    ]
    mongodb.top_users.insert_many(new_users)
