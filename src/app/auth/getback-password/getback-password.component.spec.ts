import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetbackPasswordComponent } from './getback-password.component';

describe('GetbackPasswordComponent', () => {
  let component: GetbackPasswordComponent;
  let fixture: ComponentFixture<GetbackPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetbackPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetbackPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
