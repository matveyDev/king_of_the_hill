from pydantic import BaseModel


class User(BaseModel):
    address: str
    total_prizes: int
        
    class Config:
        schema_extra = {
            'example': {
                'address': '0xab63C55951B3e331121B1E12120e82f3D44AC7ca',
                'total_prizes': 3
            }
        }
