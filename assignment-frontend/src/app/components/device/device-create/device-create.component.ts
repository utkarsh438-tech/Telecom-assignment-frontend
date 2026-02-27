import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-device-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent {
  deviceForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      alert('Form submitted: ' + JSON.stringify(this.deviceForm.value));
    }
  }
}
