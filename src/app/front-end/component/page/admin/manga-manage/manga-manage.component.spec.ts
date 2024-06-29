import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaManageComponent } from './manga-manage.component';

describe('MangaManageComponent', () => {
  let component: MangaManageComponent;
  let fixture: ComponentFixture<MangaManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
