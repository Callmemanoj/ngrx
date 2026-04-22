import { createReducer, on } from "@ngrx/store"
import { addtoCart } from "./cart.actions";
import { CartItem } from "../models/cart.model";
import * as CartActions from './cart.actions'


export interface CartState {
    items: CartItem[];
}

export const initialCartState: CartState = {
    items: []
}

export const cartReducer = createReducer(
    initialCartState,
    on(CartActions.addtoCart, (state, {product})=>{
        const item = state.items.find(i => i.id === product.id);

        if(item){
            return {
                ...state,
                items:state.items.map(i=> i.id === product.id ? {...i,quantity: i.quantity +1 } : i)
            }
        }

        return {
            ...state,
            items: [...state.items, {...product, quantity: 1}]
        }
    }),
    on(CartActions.removeFromCart, (state, {productId})=>({
        ...state,
        items: state.items.filter(i=> i.id !== productId)
    }))
)