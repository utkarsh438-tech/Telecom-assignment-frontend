import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShelfService } from '../../../services/shelf.service'; // FIX: use backend

@Component({
  selector: 'app-shelf-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,RouterLink],
  templateUrl: './shelf-create.component.html',
  styleUrls: ['./shelf-create.component.css']
})
export class ShelfCreateComponent {
  shelfForm: FormGroup;
  positionId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private shelfService: ShelfService
  ) {
    this.positionId = this.route.snapshot.paramMap.get('positionId') ?? '';
    this.shelfForm = this.fb.group({
      name: ['', Validators.required],
      partNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.shelfForm.valid) {
      // FIX: create shelf in backend at shelfPositionId (positionId param)
      this.shelfService.createShelfAtPosition(this.positionId, this.shelfForm.value).subscribe({
        next: () => this.router.navigate(['/shelves']),
        error: () => alert('Failed to create shelf. Ensure backend is running, and shelf-position API returns usable IDs.')
      });
    }
  }
}