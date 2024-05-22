import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGenreElementComponent } from './filter-genre-element.component';

describe('FilterGenreElementComponent', () => {
  let component: FilterGenreElementComponent;
  let fixture: ComponentFixture<FilterGenreElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterGenreElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterGenreElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
