import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCount } from '../../store/cart.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() cartCount = 0;
  @Output() cartClicked = new EventEmitter<void>();

  cartCount$!:Observable<any>;

  constructor(private store:Store<{cart:any}>) {
    this.cartCount$ = store.select(selectCartCount);
  }

  openCart() {
    this.cartClicked.emit();
  }


}
