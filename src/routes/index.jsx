import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import FiscaliaPage from '../pages/FiscaliaPage';

const Routes = () => {
    return(
        <>
            <Switch>
                <Route exact path="/"><FiscaliaPage /></Route>
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default Routes;