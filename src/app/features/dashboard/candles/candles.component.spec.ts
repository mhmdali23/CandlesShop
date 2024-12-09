import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandlesComponent } from './candles.component';

describe('CandlesComponent', () => {
  let component: CandlesComponent;
  let fixture: ComponentFixture<CandlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
