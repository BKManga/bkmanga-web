import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutLawReportDialogComponent } from './out-law-report-dialog.component';

describe('OutLawReportDialogComponent', () => {
  let component: OutLawReportDialogComponent;
  let fixture: ComponentFixture<OutLawReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutLawReportDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutLawReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
