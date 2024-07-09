import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorReportDetailComponent } from './error-report-detail.component';

describe('ErrorReportDetailComponent', () => {
  let component: ErrorReportDetailComponent;
  let fixture: ComponentFixture<ErrorReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorReportDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
