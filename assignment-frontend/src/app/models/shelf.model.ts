// FIX: model aligned to backend + UI needs (summary fields are optional)
export interface Shelf {
  id: string;
  shelfName: string;
  partNumber: string;
  deviceId: string;
  deviceName: string;
  position: number;
}

// FIX: request body for creating/updating a shelf
export type ShelfUpsertRequest = {
  shelfName: string;
  partNumber: string;
 

};