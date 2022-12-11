from pymongo import MongoClient

from helpers import validate_address
from settings import MONGODB_URI, DB_NAME
from schemas import User as UserSchema


class MongodbAPI:
    
    def __init__(self) -> None:
        client = MongoClient(MONGODB_URI)
        db = client[DB_NAME]
        self.top_users = db['topUsers']

    def add_user(self, address: str):
        validate_address(address)

        new_user = {
            'address': address,
            'total_prizes': 0
        }
        self.top_users.insert_one(new_user)
    
    def add_prize_to_user(self, address: str, prize: int):
        self.top_users.update_one(
            {'address': address},
            {'$inc': {'total_prizes': prize}}
        )

    def check_user_exists(self, address: str) -> bool:
        user = self.top_users.find_one({'address': address})
        return bool(user)

    def get_users_by_total_prize(self, _limit: int) -> list[UserSchema]:
        users = self.top_users.find({'$query': {}, '$orderby': {'total_prizes': -1}}).limit(_limit)
        return users
