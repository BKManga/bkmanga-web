import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMangaComponent } from './top-manga.component';

describe('TopMangaComponent', () => {
  let component: TopMangaComponent;
  let fixture: ComponentFixture<TopMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMangaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
