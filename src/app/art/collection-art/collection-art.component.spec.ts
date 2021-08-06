import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionArtComponent } from './collection-art.component';

describe('CollectionArtComponent', () => {
  let component: CollectionArtComponent;
  let fixture: ComponentFixture<CollectionArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
