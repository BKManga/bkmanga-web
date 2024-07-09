import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutLawReportDetailComponent } from './out-law-report-detail.component';

describe('OutLawReportDetailComponent', () => {
  let component: OutLawReportDetailComponent;
  let fixture: ComponentFixture<OutLawReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutLawReportDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutLawReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
