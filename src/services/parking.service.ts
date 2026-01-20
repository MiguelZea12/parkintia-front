import { Camera, ParkingZone, ParkingStatusSummary } from '@/types/parking';

// Backend NestJS URL (puerto 4000), NO el servicio Python directo
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const parkingService = {
  // ========== CAMERAS ==========
  
  async getCameras(): Promise<Camera[]> {
    try {
      // Crear un AbortController para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout
      
      const response = await fetch(`${API_URL}/api/cameras`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch cameras: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error: unknown) {
      // Si es un error de red o timeout, lanzar un error más descriptivo
      if (error instanceof Error && (error.name === 'AbortError' || error.name === 'TypeError' || error.message?.includes('fetch'))) {
        throw new Error('Backend no disponible. Verifica que el servidor esté corriendo.');
      }
      throw error;
    }
  },

  async getCamera(id: string): Promise<Camera> {
    const response = await fetch(`${API_URL}/camera/${id}`);
    if (!response.ok) throw new Error('Failed to fetch camera');
    return response.json();
  },

  async createCamera(data: Partial<Camera>): Promise<Camera> {
    const response = await fetch(`${API_URL}/camera`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create camera');
    return response.json();
  },

  async updateCamera(id: string, data: Partial<Camera>): Promise<Camera> {
    const response = await fetch(`${API_URL}/camera/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update camera');
    return response.json();
  },

  async deleteCamera(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/camera/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete camera');
  },

  // ========== PARKING ZONES ==========

  async getParkingZones(cameraId: string): Promise<ParkingZone[]> {
    const response = await fetch(`${API_URL}/camera/${cameraId}/parking-zones`);
    if (!response.ok) throw new Error('Failed to fetch parking zones');
    return response.json();
  },

  async createParkingZone(data: Omit<ParkingZone, 'id' | 'isOccupied'> & { cameraId: string }): Promise<ParkingZone> {
    const response = await fetch(`${API_URL}/camera/parking-zones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create parking zone');
    return response.json();
  },

  async bulkCreateParkingZones(cameraId: string, zones: Array<Omit<ParkingZone, 'id' | 'isOccupied'>>): Promise<ParkingZone[]> {
    const response = await fetch(`${API_URL}/camera/parking-zones/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cameraId, zones }),
    });
    if (!response.ok) throw new Error('Failed to bulk create parking zones');
    return response.json();
  },

  async updateParkingZone(zoneId: string, data: Partial<ParkingZone>): Promise<ParkingZone> {
    const response = await fetch(`${API_URL}/camera/parking-zones/${zoneId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update parking zone');
    return response.json();
  },

  async deleteParkingZone(zoneId: string): Promise<void> {
    const response = await fetch(`${API_URL}/camera/parking-zones/${zoneId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete parking zone');
  },

  async deleteAllZones(cameraId: string): Promise<void> {
    const response = await fetch(`${API_URL}/camera/${cameraId}/parking-zones/all`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete all zones');
  },

  // ========== PARKING STATUS & DETECTION ==========

  async getParkingStatus(cameraId: string): Promise<ParkingStatusSummary> {
    const response = await fetch(`${API_URL}/camera/${cameraId}/parking-status`);
    if (!response.ok) throw new Error('Failed to fetch parking status');
    return response.json();
  },

  async getParkingStatusLive(cameraId: string = 'default'): Promise<ParkingStatusSummary> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      // Ruta correcta del backend NestJS
      const response = await fetch(`${API_URL}/camera/parking-status-live?cameraId=${cameraId}`, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch live parking status: ${response.status}`);
      }
      
      return response.json();
    } catch (error: unknown) {
      // Si falla, retornar datos por defecto en lugar de lanzar error
      console.warn('No se pudo obtener estado en vivo, usando valores por defecto:', error);
      return {
        totalSpaces: 12,
        occupiedSpaces: 0,
        freeSpaces: 12,
      };
    }
  },

  getStreamUrl(cameraId: string, videoSource: string): string {
    return `${API_URL}/camera/${cameraId}/stream?source=${encodeURIComponent(videoSource)}`;
  },

  getVideoFeedUrl(cameraId: string = 'default'): string {
    // Ruta correcta del backend NestJS que hace proxy al servicio Python
    return `${API_URL}/camera/video-feed?cameraId=${cameraId}`;
  },

  async controlVideo(action: 'play' | 'pause' | 'restart', cameraId: string = 'default'): Promise<{ success: boolean; message?: string }> {
    // Ruta correcta del backend NestJS
    const response = await fetch(`${API_URL}/camera/video-control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, cameraId }),
    });
    if (!response.ok) throw new Error('Failed to control video');
    return response.json();
  },

  async getDefaultZones(): Promise<{ zones: ParkingZone[] }> {
    const response = await fetch(`${API_URL}/camera/zones/default`);
    if (!response.ok) throw new Error('Failed to fetch default zones');
    return response.json();
  },
};

