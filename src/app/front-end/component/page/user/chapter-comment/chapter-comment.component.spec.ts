import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterCommentComponent } from './chapter-comment.component';

describe('ChapterCommentComponent', () => {
  let component: ChapterCommentComponent;
  let fixture: ComponentFixture<ChapterCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
