import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,ReactiveFormsModule,CommonModule, MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCardModule,
    GoogleMapsModule
  ],
  exports:[
    HttpClientModule,ReactiveFormsModule,CommonModule, MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCardModule,
    GoogleMapsModule
  ],
  providers:[ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class GlobalModule { }
