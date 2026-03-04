import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
@Component({
  selector: 'app-device-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent {
  deviceForm: FormGroup;

    constructor(
    private fb: FormBuilder,
    private router: Router,
    private deviceService: DeviceService
  ) {
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
     this.deviceService.createDevice(this.deviceForm.value).subscribe({
        next: () => this.router.navigate(['/devices']),
        error: () => {
          // FIX: keep it simple; you can add a snackbar later
          alert('Failed to create device. Please ensure backend is running and CORS is enabled.');
        }
      });
    }
  }
}