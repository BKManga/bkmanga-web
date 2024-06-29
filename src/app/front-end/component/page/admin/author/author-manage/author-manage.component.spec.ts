import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorManageComponent } from './author-manage.component';

describe('AuthorManageComponent', () => {
  let component: AuthorManageComponent;
  let fixture: ComponentFixture<AuthorManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
