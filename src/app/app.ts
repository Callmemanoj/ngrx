import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './component/header/header';
import { Cart } from './component/cart/cart';
import { CommonModule } from '@angular/common';
import { Product } from './component/product/product';
import { AnalyticsService } from './services/analytics.service';
import { filter } from 'rxjs';
import { Chat } from './component/chat/chat';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    Header,
    Cart,
    Product,
    Chat,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('shoppingCart');

  constructor(private analyticsService: AnalyticsService, private router: Router) {}

  isCartOpened = false;
  isChatOpened = false;

  openCart() {
    this.isCartOpened = true;
  }

  closeCart() {
    this.isCartOpened = false;
  }

  openChat() {
    this.isChatOpened = true;
  }

  closeChat(event: any) {
    console.log('Chat closed', event);
    this.isChatOpened = false;
  }


  ngOnInit(): void {
    this.analyticsService.init();

     // Track every route change as a page view
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.analyticsService.trackPageView(event.urlAfterRedirects);
    });
  }
}
