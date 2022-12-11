from pymongo import MongoClient
from settings import MONGODB_URI, DB_NAME


class MongodbAPI:
    
    def __init__(self) -> None:
        self.client = MongoClient(MONGODB_URI)
        self.db = self.client[DB_NAME]
        self.top_users = self.db['topUsers']

    def add_user(self, address: str):
        # Validate address
        if len(address) != 42:
            raise Exception('Address must have length equals 42')

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
