export interface Device {
  id: string;
  deviceName: string;
  partNumber: string;
  buildingName: string;
  deviceType: string;
  numShelfPositions: number;
  isDeleted?: boolean;
}
