import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeWidgetComponent } from './recipe-widget.component';

describe('RecipeWidgetComponent', () => {
  let component: RecipeWidgetComponent;
  let fixture: ComponentFixture<RecipeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
