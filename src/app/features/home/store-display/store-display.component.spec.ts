import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDisplayComponent } from './store-display.component';

describe('StoreDisplayComponent', () => {
  let component: StoreDisplayComponent;
  let fixture: ComponentFixture<StoreDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
