import { Component, inject, ViewChild } from '@angular/core';
import { ClientService } from '../../../service/client.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Package } from '../../interface/package.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GlobalModule } from '../../../global/global.module';
import { PackageFormDialogComponent } from '../package-form-dialog/package-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [GlobalModule],
  providers: [ClientService],
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent {
  readonly dialog = inject(MatDialog);
  totalPackage = 0;
  packageList = [];
  displayedColumns: string[] = [
    'description', 'weight', 'width', 'height', 'depth', 'from_name',
    'from_address', 'to_name', 'to_address'
  ];
  dataSource = new MatTableDataSource<Package>();
  totalDocs = 1;
  limit = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private clientService: ClientService, private router: Router) { }
  ngOnInit() {

    // this.dataSource.data = 
    // [
    //   {
    //     from_location: { lat: 34.052235, lng: -118.243683 },
    //     to_location: { lat: 40.712776, lng: -74.005974 },
    //     package_id: '35e063c9-e0bb-4afe-aa6c-e17c14ed7935',
    //     description: 'Sample package',
    //     weight: 2.5,
    //     width: 10,
    //     height: 15,
    //     depth: 5,
    //     from_name: 'Dr. Nina Reichert',
    //     from_address: '2475 Gideon Expressway',
    //     to_name: 'Leroy Baumbach',
    //     to_address: '123 Main St, Anytown, USA',
    //     deletedAt: 1721557309,
    //   }
    // ];
    this.clientService.getPackage().subscribe((res: any) => {
      this.dataSource.data=res.data
      this.totalPackage = res.data.length

    }

    )
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  pageEvent(event: any) {
    console.log(event);
    // Handle pagination event here, e.g., fetch new data based on page index and page size
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(PackageFormDialogComponent, {
      width: '70%',
      height: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


  openDialog(): void {
    this.router.navigate(['/client/create-package']);
    // const dialogRef = this.dialog.open(PackageFormDialogComponent, {
    //   data: '',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');

    // });
  }
}
