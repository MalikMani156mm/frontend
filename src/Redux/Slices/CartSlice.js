import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart(state, action) {
            const productToAdd = action.payload;
            state.cart.unshift({ ...productToAdd, quantity: 1 });
        },
        removeFromCart(state, action) {
            const FIRToRemove = action.payload;
            state.cart = state.cart.filter(FIR => FIR._id !== FIRToRemove._id);
        },
        emptyCart(state, action) {
            state.cart = [];
        },
    },
})

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions
export default cartSlice.reducer