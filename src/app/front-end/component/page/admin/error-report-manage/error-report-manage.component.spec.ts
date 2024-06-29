import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorReportManageComponent } from './error-report-manage.component';

describe('ErrorReportManageComponent', () => {
  let component: ErrorReportManageComponent;
  let fixture: ComponentFixture<ErrorReportManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorReportManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorReportManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
