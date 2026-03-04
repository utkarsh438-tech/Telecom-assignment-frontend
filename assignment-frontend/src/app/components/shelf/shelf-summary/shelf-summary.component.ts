import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ShelfService } from '../../../services/shelf.service'; // FIX: use backend
import { Shelf } from '../../../models/shelf.model';

@Component({
  selector: 'app-shelf-summary',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './shelf-summary.component.html',
  styleUrls: ['./shelf-summary.component.css']
})
export class ShelfSummaryComponent {
  shelf: Shelf | null = null; // FIX

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shelfService: ShelfService
  ) {
    // FIX: load shelf by route id
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.shelfService.getShelfById(id).subscribe({
        next: (shelf) => (this.shelf = shelf),
        error: () => (this.shelf = null)
      });
    }
  }

  updateShelf(): void {
    // Placeholder navigation after "update" until real update flow is wired.
    this.router.navigate(['/shelves']);
  }

  deleteShelf(): void {
    // FIX: delete in backend then navigate back
    if (!this.shelf?.id) return;
    this.shelfService.deleteShelf(this.shelf.id).subscribe({
      next: () => this.router.navigate(['/shelves']),
      error: () => alert('Failed to delete shelf. Please ensure backend is running and CORS is enabled.')
    });
  }

  goToDevice(): void {
    // FIX: deviceId is optional until backend returns it
    if (!this.shelf?.deviceId) return;
    this.router.navigate(['/devices', this.shelf.deviceId]);
  }
}