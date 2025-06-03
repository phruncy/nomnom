import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeWidgetDisplayComponent } from './recipe-widget-display.component';

describe('RecipeWidgetDisplayComponent', () => {
  let component: RecipeWidgetDisplayComponent;
  let fixture: ComponentFixture<RecipeWidgetDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeWidgetDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeWidgetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
