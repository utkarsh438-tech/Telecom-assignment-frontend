import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // FIX: use backend
import { Observable } from 'rxjs';
import { ShelfPosition } from '../models/shelf-position.model';

@Injectable({
  providedIn: 'root'
})
export class ShelfPositionService {

  // FIX: match current backend path '/shelf-Position'
  private baseUrl = 'http://localhost:8080/shelf-Position';

  constructor(private http: HttpClient) { }

  // FIX: list shelf positions for a device
  getByDeviceId(deviceId: string): Observable<ShelfPosition[]> {
    return this.http.get<ShelfPosition[]>(`${this.baseUrl}/device/${deviceId}`);
  }

  // FIX: free (unallocate) a shelf position
  freeShelfPosition(id: string): Observable<ShelfPosition> {
    return this.http.put<ShelfPosition>(`${this.baseUrl}/${id}/delete`, {});
  }
}