import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyAddComponent } from './privacy-policy-add.component';

describe('PrivacyPolicyAddComponent', () => {
  let component: PrivacyPolicyAddComponent;
  let fixture: ComponentFixture<PrivacyPolicyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
