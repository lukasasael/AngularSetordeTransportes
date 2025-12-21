import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovBreadcrumb } from './gov-breadcrumb';

describe('GovBreadcrumb', () => {
  let component: GovBreadcrumb;
  let fixture: ComponentFixture<GovBreadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovBreadcrumb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovBreadcrumb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
