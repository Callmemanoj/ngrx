import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../../store/cart.reducer';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideStore({cart: cartReducer})],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
