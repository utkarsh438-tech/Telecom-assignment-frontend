// FIX: model aligned to backend shelf-position DTO (recommended fields)
export interface ShelfPosition {
  id: string;
  deviceId: string;
  positionNumber: number;
  allocated: boolean;
  shelfId?: string | null;
  shelfName?: string | null;
}