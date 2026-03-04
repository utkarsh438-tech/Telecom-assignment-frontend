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
import { DeviceService } from '../../../services/device.service';  
import { ShelfPositionService } from '../../../services/shelf-position.service';  
import { Device } from '../../../models/device.model';
import { ShelfPosition } from '../../../models/shelf-position.model';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, FormsModule, NgFor],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent {
  constructor(
    private router: Router,
    private deviceService: DeviceService,
    private shelfPositionService: ShelfPositionService
  ) {
     
    this.deviceService.getAllDevices().subscribe({
      next: (devices) => {
        this.allDevices = devices ?? [];
        this.devices = [...this.allDevices];
      },
      error: () => {
         
        this.allDevices = [];
        this.devices = [];
      }
    });
  }

  allDevices: Device[] = [];  

  devices: Device[] = []; 
  displayedColumns: string[] = ['deviceName', 'deviceType', 'buildingName', 'partNumber', 'numShelfPositions', 'actions'];

  createDevice(): void {
    this.router.navigate(['/devices/create']);
  }

  goToShelves(): void {
    this.router.navigate(['/shelves']);
  }

  selectedDeviceId: string | null = null; 
  selectedShelfPositionId: string | null = null;
  freePositions: ShelfPosition[] = [];

  onDeviceChange(deviceId: string): void {
    this.selectedDeviceId = deviceId || null;
    this.selectedShelfPositionId = null;

    if (!this.selectedDeviceId) {
      this.freePositions = [];
      return;
    } 
    this.shelfPositionService.getByDeviceId(this.selectedDeviceId).subscribe({
      next: (positions) => {
        this.freePositions = (positions ?? []).filter(p => !p.allocated);
      },
      error: () => {
        this.freePositions = [];
      }
    });
  }

  goToCreateShelf(): void { 
    if (!this.selectedDeviceId || !this.selectedShelfPositionId) return;
    this.router.navigate(['/shelves/create', this.selectedShelfPositionId]);
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