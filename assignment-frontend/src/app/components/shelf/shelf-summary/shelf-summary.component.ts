import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MOCK_SHELVES } from '../../../mock-data';

@Component({
  selector: 'app-shelf-summary',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './shelf-summary.component.html',
  styleUrls: ['./shelf-summary.component.css']
})
export class ShelfSummaryComponent {
  shelf = {
    ...MOCK_SHELVES[0]
  };

  constructor(private router: Router) {}

  updateShelf(): void {
    // Placeholder navigation after "update" until real update flow is wired.
    this.router.navigate(['/shelves']);
  }

  deleteShelf(): void {
    // Placeholder navigation after "delete" until real delete flow is wired.
    this.router.navigate(['/shelves']);
  }

  goToDevice(): void {
    this.router.navigate(['/devices', this.shelf.deviceId]);
  }
}