import { createAction, props } from "@ngrx/store";
import { Products } from "../models/product.model";

export const addtoCart = createAction(
    '[Cart] Add to Cart',
    props<{product:Products}>()
);


export const removeFromCart = createAction(
    '[Cart] Remove from Cart',
    props<{productId:number}>()
)
