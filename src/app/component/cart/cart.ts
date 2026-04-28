import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, startWith } from 'rxjs';
import { selectCartItems, selectCartTotal, } from '../../store/cart.selectors';
import { CartState } from '../../store/cart.reducer';
import { removeFromCart } from '../../store/cart.actions';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  @Output() cartClose = new EventEmitter<void>();
  cartItems$!:Observable<CartItem[]>;
  cartTotal$!:Observable<number>;

  constructor(private store:Store<{cart:CartState}>) {
    this.cartItems$ = store.select(selectCartItems).pipe(startWith([]));
    this.cartTotal$ = store.select(selectCartTotal).pipe(startWith(0));
  }

  removeFromCart(productId:number) {
    this.store.dispatch(removeFromCart({productId}))
  }



}
