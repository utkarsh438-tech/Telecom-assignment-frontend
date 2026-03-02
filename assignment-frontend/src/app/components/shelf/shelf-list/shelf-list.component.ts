import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MOCK_SHELVES } from '../../../mock-data';

@Component({
  selector: 'app-shelf-list',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatChipsModule, NgFor],
  templateUrl: './shelf-list.component.html',
  styleUrls: ['./shelf-list.component.css']
})
export class ShelfListComponent {

  constructor(private router: Router) {}

  allShelves = MOCK_SHELVES;
  shelves = [...this.allShelves];

  displayedColumns: string[] = ['name', 'partNumber', 'deviceName', 'position', 'actions'];

  viewShelf(id: string): void {
    this.router.navigate(['/shelves', id]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.shelves = this.allShelves.filter(s =>
      s.name.toLowerCase().includes(filterValue) ||
      s.partNumber.toLowerCase().includes(filterValue) ||
      s.deviceName.toLowerCase().includes(filterValue)
    );
  }

  get totalShelves(): number {
    return this.allShelves.length;
  }
}