from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List
from database import create_db_and_tables, engine
from models import Scan, ScanRead
import shutil
import os
import uuid
from datetime import datetime
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_session():
    with Session(engine) as session:
        yield session

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    os.makedirs("uploads", exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "ANPR System Backend API"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/scan", response_model=ScanRead)
async def scan_plate(file: UploadFile = File(...), session: Session = Depends(get_session)):
   
    file_extension = file.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_extension}"
    file_path = f"uploads/{file_name}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)


    mock_plates = ["BA 2 PA 5522", "BA 1 JA 9988", "GA 3 PA 1234"]
    detected_plate = random.choice(mock_plates)
    confidence = round(random.uniform(0.85, 0.99), 2)
    

    scan = Scan(
        image_path=file_path,
        plate_number=detected_plate,
        confidence=confidence,
        status="Success" if confidence > 0.9 else "Review"
    )
    
    session.add(scan)
    session.commit()
    session.refresh(scan)
    
    return scan

@app.get("/api/scans", response_model=List[ScanRead])
def get_scans(session: Session = Depends(get_session)):
    scans = session.exec(select(Scan).order_by(Scan.timestamp.desc()).limit(10)).all()
    return scans
