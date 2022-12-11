import uvicorn
from fastapi import FastAPI

from database.schemas import User as UserSchema
from database.mongodb import MongodbAPI

app = FastAPI()
mongodb = MongodbAPI()


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
