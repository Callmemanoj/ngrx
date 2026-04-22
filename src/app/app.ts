import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './component/header/header';
import { Cart } from './component/cart/cart';
import { CommonModule } from '@angular/common';
import { Product } from './component/product/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    Header,
    Cart,
    Product,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('shoppingCart');

  isCartOpened = false;

  openCart() {
    this.isCartOpened = true;
  }

  closeCart() {
    this.isCartOpened = false;
  }

}
