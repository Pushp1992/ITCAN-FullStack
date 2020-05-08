import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { MyCartPage, ItemListingPage, NotFoundPage } from '../views/view';

const Routes = () => {
    return(
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={ItemListingPage} />
                <Route path="/cart" component={MyCartPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </React.Fragment>
    )
}

export default Routes;