import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipsInfoComponent } from './starships-info.component';

describe('StarshipsInfoComponent', () => {
  let component: StarshipsInfoComponent;
  let fixture: ComponentFixture<StarshipsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarshipsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
