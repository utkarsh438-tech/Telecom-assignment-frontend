import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-device-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent {
  deviceForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.deviceForm = this.fb.group({
      deviceName: ['', Validators.required],
      partNumber: ['', Validators.required],
      buildingName: ['', Validators.required],
      deviceType: ['', Validators.required],
      numShelfPositions: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.deviceForm.valid) {
      // For now just navigate back to the device list after a successful form submission.
      // You can plug in the real backend call here later.
      this.router.navigate(['/devices']);
    }
  }
}