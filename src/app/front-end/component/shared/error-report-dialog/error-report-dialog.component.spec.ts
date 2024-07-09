import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorReportDialogComponent } from './error-report-dialog.component';

describe('ErrorReportDialogComponent', () => {
  let component: ErrorReportDialogComponent;
  let fixture: ComponentFixture<ErrorReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorReportDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
