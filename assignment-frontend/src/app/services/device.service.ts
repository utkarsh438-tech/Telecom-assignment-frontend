// src/app/services/device.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  // FIX: backend now serves devices under '/devices'
  private baseUrl = 'http://localhost:8080/devices';

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
  createDevice(device: Omit<Device, 'id'>): Observable<Device> {
    // FIX: backend returns created DeviceDTO (not a string)
    return this.http.post<Device>(`${this.baseUrl}`, device);
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