import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, NgFor],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent {
  constructor(private router: Router) {}

  // ✅ Static data
  allDevices = [
    { id: '1', deviceName: 'Device A', partNumber: 'PN123', buildingName: 'Building 1', deviceType: 'Type 1', numShelfPositions: 3 },
    { id: '2', deviceName: 'Device B', partNumber: 'PN456', buildingName: 'Building 2', deviceType: 'Type 2', numShelfPositions: 2 },
    { id: '3', deviceName: 'Device C', partNumber: 'PN789', buildingName: 'Building 3', deviceType: 'Type 3', numShelfPositions: 4 }
  ];

  devices = [...this.allDevices]; // filtered list
  displayedColumns: string[] = ['deviceName', 'partNumber', 'buildingName', 'actions'];

  createDevice(): void {
    this.router.navigate(['/devices/create']);
  }

  viewSummary(id: string): void {
    this.router.navigate(['/devices', id]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.devices = this.allDevices.filter(d => d.deviceName.toLowerCase().includes(filterValue));
  }
}
