import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    const cart = {};
    // Initialize cart with item IDs and counts set to 0
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    // Fetch product data on component mount
    useEffect(() => {
        fetch('http://localhost:4000/allproduct')
            .then((response) => response.json())
            .then((data) => {
                setAllProducts(data)
                // console.log(data,"amit")
            }
            )


        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'GET',
                headers: {
                    //   Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                }
            }).then((response) => (response.json()))
                .then((data) => (
                    console.log("dataamit", data),
                    setCartItems(data)));
        }

    }, []);

    // Function to add an item to the cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId })

            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId })

            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

    // Function to calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {

            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find((product) => product.id === Number(item))
                totalAmount += itemInfo?.price * cartItems[item];
            }
            return totalAmount;
        }
    }

    // Function to calculate total cart items
    const getTotalCartItem = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    const contextValue = {
        allProducts,
        cartItems,
        getTotalCartAmount,
        getTotalCartItem,
        addToCart,
        removeFromCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
