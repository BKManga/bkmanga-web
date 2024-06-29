import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyManageComponent } from './privacy-policy-manage.component';

describe('PrivacyPolicyManageComponent', () => {
  let component: PrivacyPolicyManageComponent;
  let fixture: ComponentFixture<PrivacyPolicyManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
