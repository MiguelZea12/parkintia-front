// Configuración base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface CameraData {
  count_cars: number;
  empty_spaces: number;
  time_video_sg: string;
}

export interface CameraStats {
  totalSpaces: number;
  occupiedSpaces: number;
  emptySpaces: number;
  occupancyRate: number;
}

class CameraService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getAllCameraData(): Promise<CameraData[]> {
    return this.request<CameraData[]>('/camera/all-data');
  }

  // Procesa los datos para obtener estadísticas útiles
  calculateCameraStats(data: CameraData[]): CameraStats {
    if (!data || data.length === 0) {
      return {
        totalSpaces: 0,
        occupiedSpaces: 0,
        emptySpaces: 0,
        occupancyRate: 0
      };
    }

    // Tomar los datos más recientes (último elemento del array)
    const latestData = data[data.length - 1];
    
    const occupiedSpaces = latestData.count_cars;
    const emptySpaces = latestData.empty_spaces;
    const totalSpaces = occupiedSpaces + emptySpaces;
    const occupancyRate = totalSpaces > 0 ? (occupiedSpaces / totalSpaces) * 100 : 0;

    return {
      totalSpaces,
      occupiedSpaces,
      emptySpaces,
      occupancyRate: Math.round(occupancyRate * 100) / 100 // Redondear a 2 decimales
    };
  }

  // Obtiene datos históricos para gráficos
  getOccupancyHistory(data: CameraData[]): Array<{ time: string; occupied: number; empty: number; total: number }> {
    return data.map(item => ({
      time: item.time_video_sg,
      occupied: item.count_cars,
      empty: item.empty_spaces,
      total: item.count_cars + item.empty_spaces
    }));
  }
}

export const cameraService = new CameraService();
