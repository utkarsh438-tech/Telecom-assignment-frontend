import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shelf-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './shelf-create.component.html',
  styleUrls: ['./shelf-create.component.css']
})
export class ShelfCreateComponent {
  shelfForm: FormGroup;
  positionId: string;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.positionId = this.route.snapshot.paramMap.get('positionId') ?? '';
    this.shelfForm = this.fb.group({
      name: ['', Validators.required],
      partNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.shelfForm.valid) {
      // For static preview, navigate to shelves list after submit.
      this.router.navigate(['/shelves']);
    }
  }
}