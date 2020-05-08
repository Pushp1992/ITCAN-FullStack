import React from 'react';
import ListingPage from './listingPage/listingPage';
import CartPage from './cart/cart';
import NotFound from './notFound/notFound';

const MyCartPage = (props) => {
    return <CartPage {...props} />
}

const ItemListingPage = () => {
    return <ListingPage />
}

const NotFoundPage = () => {
    return <NotFound />
}

export { MyCartPage, ItemListingPage, NotFoundPage }