import { createSelector, select } from "@ngrx/store";
import { CartState } from "./cart.reducer";

export interface AppState {
    cart: CartState;
}

export const selectCartState = (state:AppState) => state.cart;

export const selectCartItems = createSelector(
    selectCartState,
    cart=> cart.items
);

export const selectCartCount = createSelector(
    selectCartItems,
    items=>items.reduce((sum,item)=>sum + item.quantity, 0)
)

export const selectCartTotal = createSelector(
    selectCartItems,
    items=>items.reduce((sum,item)=>sum + item.quantity * item.price, 0)
)