import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAdComponent } from './top-ad.component';

describe('TopAdComponent', () => {
  let component: TopAdComponent;
  let fixture: ComponentFixture<TopAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
