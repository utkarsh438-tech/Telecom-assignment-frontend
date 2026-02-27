// src/app/components/device/device-summary/device-summary.component.ts

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-summary',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, NgFor],
  templateUrl: './device-summary.component.html',
  styleUrls: ['./device-summary.component.css']
})
export class DeviceSummaryComponent {
  constructor(private router: Router) {}

  device = {
    id: '1',
    deviceName: 'Device A',
    partNumber: 'PN123',
    buildingName: 'Building 1',
    deviceType: 'Type 1',
    numShelfPositions: 3
  };

  shelfPositions = [
    { position: 1, status: 'Allocated', shelfName: 'Shelf 1' },
    { position: 2, status: 'Free', shelfName: null },
    { position: 3, status: 'Free', shelfName: null }
  ];

  displayedColumns: string[] = ['position', 'status', 'actions'];

  addShelf(position: number): void {
    this.router.navigate(['/shelves/create', position]);
  }

  viewShelf(): void {
    this.router.navigate(['/shelves/s1']); // static shelf id for now
  }
}
