import { fetchWithAuth } from '@/config/api.config';

export interface OccupancySnapshot {
  id: string;
  cameraId: string | null;
  totalSpaces: number;
  occupiedSpaces: number;
  freeSpaces: number;
  occupancyRate: number;
  timestamp: string;
  metadata?: {
    hourOfDay?: number;
    dayOfWeek?: number;
    isWeekend?: boolean;
  };
}

export interface HourlyAverage {
  hour: number;
  avgOccupancy: number;
  count: number;
}

export interface PeriodStatistics {
  avgOccupancy: number;
  maxOccupancy: number;
  minOccupancy: number;
  peakHour: number;
  totalSnapshots: number;
}

export const reportsService = {
  /**
   * Obtener histórico de ocupación
   */
  async getOccupancyHistory(
    cameraId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<OccupancySnapshot[]> {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    if (cameraId) {
      params.append('cameraId', cameraId);
    }

    return fetchWithAuth<OccupancySnapshot[]>(`/cameras/history/occupancy?${params.toString()}`);
  },

  /**
   * Obtener promedio de ocupación por hora
   */
  async getHourlyAverage(
    cameraId: string | null,
    days: number = 7,
  ): Promise<HourlyAverage[]> {
    const params = new URLSearchParams({
      days: days.toString(),
    });

    if (cameraId) {
      params.append('cameraId', cameraId);
    }

    return fetchWithAuth<HourlyAverage[]>(`/cameras/history/hourly-average?${params.toString()}`);
  },

  /**
   * Obtener estadísticas de un período
   */
  async getPeriodStatistics(
    cameraId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<PeriodStatistics> {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    if (cameraId) {
      params.append('cameraId', cameraId);
    }

    return fetchWithAuth<PeriodStatistics>(`/cameras/history/period-stats?${params.toString()}`);
  },

  /**
   * Forzar guardado manual de snapshot
   */
  async saveManualSnapshot(): Promise<{ success: boolean; message: string }> {
    return fetchWithAuth<{ success: boolean; message: string }>('/cameras/history/snapshot', {
      method: 'POST',
    });
  },

  /**
   * Helpers para generar rangos de fechas comunes
   */
  getDateRange(period: 'today' | 'yesterday' | 'week' | 'month'): { start: Date; end: Date } {
    const now = new Date();
    const start = new Date();
    const end = new Date();

    switch (period) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'yesterday':
        start.setDate(now.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(now.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        break;
      case 'week':
        start.setDate(now.getDate() - 7);
        start.setHours(0, 0, 0, 0);
        break;
      case 'month':
        start.setDate(now.getDate() - 30);
        start.setHours(0, 0, 0, 0);
        break;
    }

    return { start, end };
  },
};
