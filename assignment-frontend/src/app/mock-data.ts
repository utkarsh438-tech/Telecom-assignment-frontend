import { Device } from './models/device.model';

export type ShelfPositionStatus = 'Free' | 'Allocated';

export type ShelfSummary = {
  id: string;
  name: string;
  partNumber: string;
  deviceId: string;
  deviceName: string;
  position: number;
};

export type ShelfPositionRow = {
  position: number;
  status: ShelfPositionStatus;
  shelfId: string | null;
  shelfName: string | null;
};

export const MOCK_DEVICES: Device[] = [
  { id: 'd1', deviceName: 'Metro Aggregation 01', partNumber: 'CI-AGG-2100', buildingName: 'HQ - Block A', deviceType: 'Aggregation', numShelfPositions: 8 },
  { id: 'd2', deviceName: 'Core Router 07', partNumber: 'CI-CR-7700', buildingName: 'DC - West', deviceType: 'Core', numShelfPositions: 10 },
  { id: 'd3', deviceName: 'Edge Switch 12', partNumber: 'CI-ES-1200', buildingName: 'POP - North', deviceType: 'Edge', numShelfPositions: 6 },
  { id: 'd4', deviceName: 'Optical Shelf 03', partNumber: 'CI-OP-340', buildingName: 'DC - East', deviceType: 'Optical', numShelfPositions: 12 },
  { id: 'd5', deviceName: 'Access Node 09', partNumber: 'CI-AN-900', buildingName: 'Branch - Pune', deviceType: 'Access', numShelfPositions: 4 },
  { id: 'd6', deviceName: 'Transport 02', partNumber: 'CI-TN-220', buildingName: 'HQ - Block C', deviceType: 'Transport', numShelfPositions: 8 },
  { id: 'd7', deviceName: 'Aggregation 11', partNumber: 'CI-AGG-3100', buildingName: 'POP - South', deviceType: 'Aggregation', numShelfPositions: 6 },
  { id: 'd8', deviceName: 'Edge Switch 21', partNumber: 'CI-ES-2100', buildingName: 'Branch - Mumbai', deviceType: 'Edge', numShelfPositions: 5 }
];

export const MOCK_SHELVES: ShelfSummary[] = [
  { id: 's1', name: 'Shelf Alpha', partNumber: 'SH-ALP-100', deviceId: 'd1', deviceName: 'Metro Aggregation 01', position: 1 },
  { id: 's2', name: 'Shelf Beta', partNumber: 'SH-BET-200', deviceId: 'd1', deviceName: 'Metro Aggregation 01', position: 3 },
  { id: 's3', name: 'Shelf Gamma', partNumber: 'SH-GAM-120', deviceId: 'd2', deviceName: 'Core Router 07', position: 2 },
  { id: 's4', name: 'Shelf Delta', partNumber: 'SH-DEL-330', deviceId: 'd2', deviceName: 'Core Router 07', position: 7 },
  { id: 's5', name: 'Shelf Epsilon', partNumber: 'SH-EPS-410', deviceId: 'd3', deviceName: 'Edge Switch 12', position: 1 },
  { id: 's6', name: 'Shelf Zeta', partNumber: 'SH-ZET-510', deviceId: 'd4', deviceName: 'Optical Shelf 03', position: 4 },
  { id: 's7', name: 'Shelf Eta', partNumber: 'SH-ETA-610', deviceId: 'd4', deviceName: 'Optical Shelf 03', position: 9 },
  { id: 's8', name: 'Shelf Theta', partNumber: 'SH-THE-710', deviceId: 'd6', deviceName: 'Transport 02', position: 6 }
];

export function getMockDeviceById(id: string): Device | undefined {
  return MOCK_DEVICES.find(d => d.id === id);
}

export function getMockShelfById(id: string): ShelfSummary | undefined {
  return MOCK_SHELVES.find(s => s.id === id);
}

export function getMockShelfPositionsByDeviceId(deviceId: string): ShelfPositionRow[] {
  const device = getMockDeviceById(deviceId);
  const count = device?.numShelfPositions ?? 0;

  const shelvesForDevice = MOCK_SHELVES
    .filter(s => s.deviceId === deviceId)
    .reduce<Record<number, ShelfSummary>>((acc, shelf) => {
      acc[shelf.position] = shelf;
      return acc;
    }, {});

  return Array.from({ length: count }, (_, idx) => {
    const position = idx + 1;
    const shelf = shelvesForDevice[position];
    return shelf
      ? { position, status: 'Allocated', shelfId: shelf.id, shelfName: shelf.name }
      : { position, status: 'Free', shelfId: null, shelfName: null };
  });
}