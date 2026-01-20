export interface ParkingZone {
  id: string;
  name: string;
  spaceNumber: number;
  coordinates: Array<{ x: number; y: number }>;
  isOccupied: boolean;
  lastDetectionTime?: Date;
}

export interface Camera {
  id: string;
  name: string;
  description?: string;
  streamUrl?: string;
  videoFile?: string;
  total_parking: number;
  isActive: boolean;
  parkingZones?: ParkingZone[];
}

export interface ParkingStatusSummary {
  cameraId?: string;
  totalSpaces: number;
  occupiedSpaces: number;
  freeSpaces: number;
  spaces?: ParkingZone[];
  lastUpdate?: Date;
  occupancyRate?: number;
}
