import { Component } from '@angular/core';
import { GlobalModule } from '../../../global/global.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-form-dialog',
  standalone: true,
  imports: [GlobalModule],
  templateUrl: './package-form-dialog.component.html',
  styleUrl: './package-form-dialog.component.css'
})
export class PackageFormDialogComponent {
  packageForm!: FormGroup;
  from_location = { lat: 34.052235, lng: -118.243683 };
  to_location = { lat: 40.712776, lng: -74.005974 };
  zoom = 5;

  constructor(
    private fb: FormBuilder,private router:Router
    //public dialogRef: MatDialogRef<PackageFormDialogComponent>
  ) {}

  ngOnInit(): void {
    this.packageForm = this.fb.group({
      from_name: ['', Validators.required],
      from_address: ['', Validators.required],
      from_lat: ['', Validators.pattern('^-?\\d+(\\.\\d+)?$')],
      from_lng: ['', Validators.pattern('^-?\\d+(\\.\\d+)?$')],
      to_name: ['', Validators.required],
      to_address: ['', Validators.required],
      to_lat: ['', Validators.pattern('^-?\\d+(\\.\\d+)?$')],
      to_lng: ['', Validators.pattern('^-?\\d+(\\.\\d+)?$')],
      description: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      width: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(0)]],
      depth: ['', [Validators.required, Validators.min(0)]],
    });
  }

  selectLocation(event: google.maps.MapMouseEvent, type: 'from' | 'to') {
    const latLng = event.latLng;
    if (latLng) {
      const location = {
        lat: latLng.lat(),
        lng: latLng.lng()
      };

      if (type === 'from') {
        this.from_location = location;
        const fromLatControl = this.packageForm.get('from_lat');
        const fromLngControl = this.packageForm.get('from_lng');
        if (fromLatControl && fromLngControl) {
          fromLatControl.setValue(location.lat);
          fromLngControl.setValue(location.lng);
        }
      } else if (type === 'to') {
        this.to_location = location;
        const toLatControl = this.packageForm.get('to_lat');
        const toLngControl = this.packageForm.get('to_lng');
        if (toLatControl && toLngControl) {
          toLatControl.setValue(location.lat);
          toLngControl.setValue(location.lng);
        }
      }
    }
  }

  showMap(type: 'from' | 'to'): boolean {
    const lat = this.packageForm.get(`${type}_lat`)?.value;
    const lng = this.packageForm.get(`${type}_lng`)?.value;
    return lat != null && lng != null;
  }


  updateLatLng(type: 'from' | 'to', coordType: 'lat' | 'lng', event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
  
    if (coordType === 'lat') {
      if (type === 'from') {
        this.from_location.lat = value;
      } else {
        this.to_location.lat = value;
      }
    } else if (coordType === 'lng') {
      if (type === 'from') {
        this.from_location.lng = value;
      } else {
        this.to_location.lng = value;
      }
    }
  }
  
  onSubmit() {
    if (this.packageForm.valid) {
      const formData = {
        ...this.packageForm.value,
        from_location: this.from_location,
        to_location: this.to_location
      };
      this.router.navigate(['/client/package']);
      console.log('Form Data:', formData);
     // this.dialogRef.close(formData);
    }
  }

  onCancel(): void {
    this.router.navigate(['/client/package']);
   // this.dialogRef.close();
  }
}
