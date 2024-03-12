import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSearchHeaderComponent } from './result-search-header.component';

describe('ResultSearchHeaderComponent', () => {
  let component: ResultSearchHeaderComponent;
  let fixture: ComponentFixture<ResultSearchHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultSearchHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
