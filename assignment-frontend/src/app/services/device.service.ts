// src/app/services/device.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private baseUrl = 'http://localhost:8080/devices'; // adjust if backend runs on different port

  constructor(private http: HttpClient) { }

  // ✅ Get all devices
  getAllDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.baseUrl}`);
  }

  // ✅ Get device by ID
  getDeviceById(id: string): Observable<Device> {
    return this.http.get<Device>(`${this.baseUrl}/${id}`);
  }

  // ✅ Create new device
  createDevice(device: Device): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, device);
  }

  // ✅ Update device
  updateDevice(id: string, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.baseUrl}/${id}`, device);
  }

  // ✅ Delete device (soft delete)
  deleteDevice(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
