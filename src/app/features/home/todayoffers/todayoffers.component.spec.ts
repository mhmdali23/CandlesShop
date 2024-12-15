import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayoffersComponent } from './todayoffers.component';

describe('TodayoffersComponent', () => {
  let component: TodayoffersComponent;
  let fixture: ComponentFixture<TodayoffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayoffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
