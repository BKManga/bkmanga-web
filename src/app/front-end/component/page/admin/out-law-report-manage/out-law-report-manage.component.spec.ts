import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutLawReportManageComponent } from './out-law-report-manage.component';

describe('OutLawReportManageComponent', () => {
  let component: OutLawReportManageComponent;
  let fixture: ComponentFixture<OutLawReportManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutLawReportManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutLawReportManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
