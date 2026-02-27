import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shelf-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './shelf-create.component.html',
  styleUrls: ['./shelf-create.component.css']
})
export class ShelfCreateComponent {
  shelfForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.shelfForm = this.fb.group({
      name: ['', Validators.required],
      partNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.shelfForm.valid) {
      alert('Shelf created: ' + JSON.stringify(this.shelfForm.value));
    }
  }
}
