import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        // state will be the current daya and action is what you have sent in payload
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find(
                (x) => x._id === item._id
            );

            if (existingItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === item._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            localStorage.setItem(
                'cartItems',
                JSON.stringify(state.cartItems)
            );
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;

            state.cartItems = state.cartItems.filter(
                (x) => x._id !== itemId
            );

            localStorage.setItem(
                'cartItems',
                JSON.stringify(state.cartItems)
            );
        },

        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const nextQuantity = Math.max(1, Number(quantity) || 1);

            state.cartItems = state.cartItems.map((item) =>
                item._id === itemId ? { ...item, qty: nextQuantity } : item
            );

            localStorage.setItem(
                'cartItems',
                JSON.stringify(state.cartItems)
            );
        },

        clearCart: (state) => {
            state.cartItems = [];

            localStorage.removeItem('cartItems');
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;