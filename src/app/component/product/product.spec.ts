import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product } from './product';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../../store/cart.reducer';

describe('Product', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Product],
      providers:[provideStore({cart: cartReducer})],
    }).compileComponents();

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
