import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // FIX: use backend
import { Observable } from 'rxjs';
import { Shelf, ShelfUpsertRequest } from '../models/shelf.model';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  private baseUrl = 'http://localhost:8080/shelves'; // FIX: matches backend controller

  constructor(private http: HttpClient) { }

  // FIX: list shelves (backend must return summary fields for full UI)
  getAllShelves(): Observable<Shelf[]> {
    return this.http.get<Shelf[]>(`${this.baseUrl}`);
  }

  getShelfById(id: string): Observable<Shelf> {
    return this.http.get<Shelf>(`${this.baseUrl}/${id}`);
  }

  // FIX: backend endpoint is '/create/{positionId}' under '/shelves'
  createShelfAtPosition(shelfPositionId: string, payload: ShelfUpsertRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/create/${shelfPositionId}`, payload, { responseType: 'text' });
  }

  updateShelf(id: string, payload: ShelfUpsertRequest): Observable<Shelf> {
    return this.http.put<Shelf>(`${this.baseUrl}/${id}`, payload);
  }

  deleteShelf(id: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}