import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaDetailManageComponent } from './manga-detail-manage.component';

describe('MangaDetailManageComponent', () => {
  let component: MangaDetailManageComponent;
  let fixture: ComponentFixture<MangaDetailManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaDetailManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaDetailManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
