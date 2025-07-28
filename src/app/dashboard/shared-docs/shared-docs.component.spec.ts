import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDocsComponent } from './shared-docs.component';

describe('SharedDocsComponent', () => {
  let component: SharedDocsComponent;
  let fixture: ComponentFixture<SharedDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
