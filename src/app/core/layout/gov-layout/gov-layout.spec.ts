import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovLayout } from './gov-layout';

describe('GovLayout', () => {
  let component: GovLayout;
  let fixture: ComponentFixture<GovLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
