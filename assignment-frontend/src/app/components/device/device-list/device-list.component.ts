import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MOCK_DEVICES, getMockShelfPositionsByDeviceId, ShelfPositionRow } from '../../../mock-data';
@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, FormsModule, NgFor],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']

})
export class DeviceListComponent {
  constructor(private router: Router) {}

  // ✅ Static data
allDevices = MOCK_DEVICES;
  devices = [...this.allDevices]; // filtered list
  displayedColumns: string[] = ['deviceName', 'partNumber', 'buildingName', 'actions'];

  createDevice(): void {
    this.router.navigate(['/devices/create']);
  }

    goToShelves(): void {
    this.router.navigate(['/shelves']);
  }
  selectedDeviceId: string | null = null;
  selectedPosition: number | string | null = null;
  freePositions: ShelfPositionRow[] = [];


onDeviceChange(deviceId: string): void {
    this.selectedDeviceId = deviceId || null;
    this.selectedPosition = null;
    this.freePositions = deviceId
      ? getMockShelfPositionsByDeviceId(deviceId).filter(p => p.status === 'Free')
      : [];
  }


 goToCreateShelf(): void {
    const pos = this.selectedPosition;
    if (!this.selectedDeviceId || pos == null || pos === '') return;
    const positionId = `${this.selectedDeviceId}-${pos}`;
    this.router.navigate(['/shelves/create', positionId]);
  }

  viewSummary(id: string): void {
    this.router.navigate(['/devices', id]);
  }

applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.devices = this.allDevices.filter(d =>
      d.deviceName.toLowerCase().includes(filterValue) ||
      d.partNumber.toLowerCase().includes(filterValue) ||
      d.buildingName.toLowerCase().includes(filterValue) ||
      d.deviceType.toLowerCase().includes(filterValue)
    );
  }
    get totalDevices(): number {
    return this.allDevices.length;
  }
}
