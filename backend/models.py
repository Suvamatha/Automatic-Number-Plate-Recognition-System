from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class ScanBase(SQLModel):
    plate_number: str
    confidence: float
    status: str = "Success" # Success, Review, Failed
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Scan(ScanBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    image_path: str

class ScanCreate(ScanBase):
    pass

class ScanRead(ScanBase):
    id: int
    image_path: str
