import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCount } from '../../store/cart.selectors';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit{
  @Input() cartCount = 0;
  @Output() cartClicked = new EventEmitter<void>();

  count = signal(0)

  cartCount$!:Observable<any>;

  constructor(private store:Store<{cart:any}>, private analytics: AnalyticsService) {
    this.cartCount$ = store.select(selectCartCount);
  }

  ngOnInit(): void {
       
  }

  openCart() {
    this.cartClicked.emit();
  }

    onSignUpClick(): void {
    this.analytics.trackEvent('cta-clicked', { buttonName: 'Sign Up' });
  }

  onLearnMoreClick(): void {
    this.analytics.trackLinkClick('Learn More Button');
  }

}
