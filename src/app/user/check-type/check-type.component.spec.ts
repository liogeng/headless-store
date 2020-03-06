import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTypeComponent } from './check-type.component';

describe('CheckTypeComponent', () => {
  let component: CheckTypeComponent;
  let fixture: ComponentFixture<CheckTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
