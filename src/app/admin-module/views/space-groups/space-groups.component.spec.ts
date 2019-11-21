import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceGroupsComponent } from './space-groups.component';

describe('SpaceGroupsComponent', () => {
  let component: SpaceGroupsComponent;
  let fixture: ComponentFixture<SpaceGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
