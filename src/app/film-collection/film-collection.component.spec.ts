import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCollectionComponent } from './film-collection.component';

describe('FilmCollectionComponent', () => {
  let component: FilmCollectionComponent;
  let fixture: ComponentFixture<FilmCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
