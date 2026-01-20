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

  async getParkingStatus(cameraId: string, mappingId?: string): Promise<ParkingStatusSummary> {
    // Si tenemos mappingId (cam-08...), pedimos directo a Python
    if (mappingId && (mappingId.startsWith('cam-') || mappingId === 'default')) {
       try {
         const response = await fetch(`http://localhost:5000/api/parking/status?cameraId=${mappingId}`);
         if (response.ok) return response.json();
       } catch (e) {
         console.warn("Python service not reachable, falling back to backend");
       }
    }

    const response = await fetch(`${API_URL}/camera/${cameraId}/parking-status`);
    if (!response.ok) throw new Error('Failed to fetch parking status');
    return response.json();
  },

  async getParkingStatusLive(cameraId: string = 'default'): Promise<ParkingStatusSummary> {
    try {
      const response = await fetch(`${API_URL}/camera/parking-status-live?cameraId=${cameraId}`);
      if (response.ok) return response.json();
    } catch (e) {
      // Fallback a llamada directa si el backend falla
      console.warn('Backend live status failed, trying direct Python service...');
    }

    // Intento directo al servicio Python
    try {
      const response = await fetch(`http://localhost:5000/api/parking/status?cameraId=${cameraId}`);
      if (!response.ok) throw new Error('Failed to fetch live parking status from Python');
      return response.json();
    } catch (e) {
      throw new Error('Failed to fetch live parking status');
    }
  },

  getStreamUrl(cameraId: string, videoSource: string): string {
    // Si videoSource es una clave conocida (cam-08, cam-01), úsala como ID para el servicio Python
    const idParam = videoSource && (videoSource.startsWith('cam-') || videoSource === 'default') 
      ? videoSource 
      : cameraId;
    
    // Conexión directa al servicio Python
    return `http://localhost:5000/api/video/feed?cameraId=${idParam}`;
  },

  getVideoFeedUrl(cameraId: string = 'default'): string {
    return `http://localhost:5000/api/video/feed?cameraId=${cameraId}`;
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

