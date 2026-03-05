// src/app/components/device/device-summary/device-summary.component.ts

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Device } from '../../../models/device.model';
import { DeviceService } from '../../../services/device.service'; // FIX: use backend
import { ShelfPositionService } from '../../../services/shelf-position.service'; // FIX: use backend
import { ShelfPosition } from '../../../models/shelf-position.model';

@Component({
  selector: 'app-device-summary',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatChipsModule, NgFor, NgIf,RouterLink],
  templateUrl: './device-summary.component.html',
  styleUrls: ['./device-summary.component.css']
})
export class DeviceSummaryComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private shelfPositionService: ShelfPositionService
  ) {
    // FIX: load device + positions from backend using route param
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDevice(id);
      this.loadShelfPositions(id);
    }
  }

  device: Device | null = null; // FIX

  shelfPositions: ShelfPosition[] = []; // FIX

  displayedColumns: string[] = ['position', 'status', 'actions'];

  private loadDevice(id: string): void {
    this.deviceService.getDeviceById(id).subscribe({
      next: (device) => (this.device = device),
      error: () => (this.device = null)
    });
  }

  private loadShelfPositions(deviceId: string): void {
    this.shelfPositionService.getByDeviceId(deviceId).subscribe({
      next: (positions) => (this.shelfPositions = positions ?? []),
      error: () => (this.shelfPositions = [])
    });
  }

  addShelf(shelfPositionId: string): void {
    // FIX: navigate using shelfPositionId (backend expects this)
    this.router.navigate(['/shelves/create', shelfPositionId]);
  }

  viewShelf(shelfId: string): void {
    this.router.navigate(['/shelves', shelfId]);
  }

  updateDevice(): void {
    if (!this.device || !this.device.id) {
      return;
    }

    this.deviceService.updateDevice(this.device.id, this.device).subscribe({
      next: (updated) => {
        this.device = updated;
        alert('Device updated successfully.');
      },
      error: () => {
        alert('Failed to update device. Please ensure backend is running and CORS is enabled.');
      }
    });
  }

  deleteDevice(): void {
    if (!this.device || !this.device.id) {
      return;
    }

    const confirmed = confirm('Are you sure you want to delete this device?');
    if (!confirmed) {
      return;
    }

    this.deviceService.deleteDevice(this.device.id).subscribe({
      next: () => {
        alert('Device deleted successfully.');
        this.router.navigate(['/devices']);
      },
      error: () => {
        next: () =>
        alert('Failed to delete device. Please ensure backend is running and CORS is enabled.');
          this.router.navigate(['/devices']);
      }
    });
  }

 onDeviceFieldChange<K extends keyof Device>(field: K, event: Event): void {
  if (!this.device) return;

  const raw = (event.target as HTMLInputElement).value;

  // Build a value of the correct type for that key
  let value: Device[K];

  if (field === 'numShelfPositions') {
    value = Number(raw) as Device[K];
  } else {
    // If your other fields are strings:
    value = raw as Device[K];
  }

  this.device[field] = value;
}
}