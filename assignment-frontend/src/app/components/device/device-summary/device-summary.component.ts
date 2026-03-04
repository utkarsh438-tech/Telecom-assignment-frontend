// src/app/components/device/device-summary/device-summary.component.ts

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../../../models/device.model';
import { DeviceService } from '../../../services/device.service'; // FIX: use backend
import { ShelfPositionService } from '../../../services/shelf-position.service'; // FIX: use backend
import { ShelfPosition } from '../../../models/shelf-position.model';

@Component({
  selector: 'app-device-summary',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatChipsModule, NgFor, NgIf],
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

  // Static stub actions for now – real backend wiring can be added later.
  updateDevice(): void {
    // no-op for now, kept simple for KT
  }

  deleteDevice(): void {
    // no-op for now, kept simple for KT
  }
}