import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceGroupViewComponent } from './space-group-view.component';

describe('SpaceGroupViewComponent', () => {
  let component: SpaceGroupViewComponent;
  let fixture: ComponentFixture<SpaceGroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceGroupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
