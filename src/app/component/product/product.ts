import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Products } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { addtoCart } from '../../store/cart.actions';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  constructor(private store:Store<{cart:number}>) {}

  products:Products[] = [
  {
    "id": 1,
    "name": "Laptop",
    "price": 999,
    "image": "images/laptop.jpg",
    "description": "High‑performance laptop with 16GB RAM, 512GB SSD, and powerful processor suitable for work and gaming."
  },
  {
    "id": 2,
    "name": "Smartphone",
    "price": 499,
    "image": "images/mobile.jpg",
    "description": "Latest smartphone featuring a high‑resolution display, fast processor, and long‑lasting battery."
  },
  {
    "id": 3,
    "name": "Tablet",
    "price": 299,
    "image": "images/tablet.jpg",
    "description": "Lightweight tablet ideal for browsing, streaming, reading, and casual productivity tasks."
  },
  {
    "id": 4,
    "name": "Headphones",
    "price": 199,
    "image": "images/headphones.jpg",
    "description": "Noise‑cancelling headphones delivering immersive sound quality and all‑day comfort."
  },
   {
    "id": 5,
    "name": "Smartwatch",
    "price": 250,
    "image": "images/smartwatch.jpg",
    "description": "Noise‑cancelling headphones delivering immersive sound quality and all‑day comfort."
  },
   {
    "id": 6,
    "name": "SmartTV",
    "price": 1000,
    "image": "images/smarttv.jpg",
    "description": "Noise‑cancelling headphones delivering immersive sound quality and all‑day comfort."
  }
];

addToCart(product:any) {
  this.store.dispatch(addtoCart({product}))
}


}
