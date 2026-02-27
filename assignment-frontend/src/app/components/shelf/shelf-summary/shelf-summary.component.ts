import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shelf-summary',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './shelf-summary.component.html',
  styleUrls: ['./shelf-summary.component.css']
})
export class ShelfSummaryComponent {
  shelf = {
    id: 's1',
    name: 'Shelf 1',
    partNumber: 'SP123',
    position: 1,
    deviceName: 'Device A'
  };

  updateShelf(): void {
    alert('Update Shelf clicked');
  }

  deleteShelf(): void {
    alert('Delete Shelf clicked');
  }
}
