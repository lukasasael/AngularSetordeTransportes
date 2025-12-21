import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionByUf } from './consumption-by-uf';

describe('ConsumptionByUf', () => {
  let component: ConsumptionByUf;
  let fixture: ComponentFixture<ConsumptionByUf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumptionByUf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionByUf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
