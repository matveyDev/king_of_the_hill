import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from settings import ORIGINS
from routes import router as api_router


app = FastAPI()
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='0.0.0.0')
