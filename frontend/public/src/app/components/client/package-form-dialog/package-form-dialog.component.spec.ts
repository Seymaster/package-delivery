import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFormDialogComponent } from './package-form-dialog.component';

describe('PackageFormDialogComponent', () => {
  let component: PackageFormDialogComponent;
  let fixture: ComponentFixture<PackageFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
