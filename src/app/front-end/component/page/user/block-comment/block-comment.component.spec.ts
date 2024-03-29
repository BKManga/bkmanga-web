import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCommentComponent } from './block-comment.component';

describe('BlockCommentComponent', () => {
  let component: BlockCommentComponent;
  let fixture: ComponentFixture<BlockCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
