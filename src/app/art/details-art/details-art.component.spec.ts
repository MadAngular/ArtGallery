import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsArtComponent } from './details-art.component';

describe('DetailsArtComponent', () => {
  let component: DetailsArtComponent;
  let fixture: ComponentFixture<DetailsArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
