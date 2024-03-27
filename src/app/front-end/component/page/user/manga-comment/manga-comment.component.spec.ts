import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaCommentComponent } from './manga-comment.component';

describe('MangaCommentComponent', () => {
  let component: MangaCommentComponent;
  let fixture: ComponentFixture<MangaCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
