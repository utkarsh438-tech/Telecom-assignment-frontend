import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShelfService } from '../../../services/shelf.service'; // FIX: use backend
import { Shelf } from '../../../models/shelf.model';
import { Device } from '../../../models/device.model';

@Component({
  selector: 'app-shelf-summary',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,RouterLink],
  templateUrl: './shelf-summary.component.html',
  styleUrls: ['./shelf-summary.component.css']
})
export class ShelfSummaryComponent {
  shelf: Shelf | null = null; // FIX
  // deviceId: String | null =  ; // FIX: for navigation to device page, may be missing until backend returns it
device:Device | null = null; // FIX: for displaying device name, may be missing until backend returns it
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
    if (!this.shelf || !this.shelf.id) {
      return;
    }

    // Prepare minimal payload expected by backend (name + partNumber)
    const payload = {
      shelfName: this.shelf.shelfName,
      partNumber: this.shelf.partNumber
    };

    this.shelfService.updateShelf(this.shelf.id, payload).subscribe({
      next: (updated) => {
        this.shelf = updated;
        alert('Shelf updated successfully.');
      },
      error: () => {
        alert('Failed to update shelf. Please ensure backend is running and CORS is enabled.');
      }
    });
  }

  deleteShelf(): void {
    // FIX: delete in backend then navigate back
    if (!this.shelf?.id) return;
    this.shelfService.deleteShelf(this.shelf.id).subscribe({
      next: () => this.router.navigate(['/shelves']),
      error: () => alert('Failed to delete shelf. Please ensure backend is running and CORS is enabled.')
    });
  }

  // goToDevice(Shelf:Shelf): void {
  //   // FIX: deviceId is optional until backend returns it
  //   if (!this.shelf?.deviceId) return;
  //   this.router.navigate(['/devices',Shelf.deviceId]);
  // }
  onShelfFieldChange(field:  'shelfName' | 'partNumber' ,event: Event): void {
    if (!this.shelf) {
     return;
    }
const value=(event.target as HTMLInputElement).value;
    (this.shelf as any)[field] = value;
}}