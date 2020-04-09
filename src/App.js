import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import AppHeader from './AppHeader';
import MicroFrontend from './MicroFrontend';

const {
    REACT_APP_BROWSE_HOST: browseHost,
    REACT_APP_RESTAURANT_HOST: restaurantHost,
    REACT_APP_ABOUT_HOST: aboutHost,
    REACT_APP_VUE_HOST: vueHost
} = process.env;

let numRestaurants = 0;
fetch(`${process.env.REACT_APP_CONTENT_HOST}/restaurants.json`)
    .then(res => res.json())
    .then(restaurants => {
        numRestaurants = restaurants.length;
    });
const getRandomRestaurantId = () =>
    Math.floor(Math.random() * numRestaurants) + 1;

const Browse = ({history}) => (
    <MicroFrontend history={history} host={browseHost} name="Browse"/>
);
const Restaurant = ({history}) => (
    <MicroFrontend history={history} host={restaurantHost} name="Restaurant"/>
);
const Random = () => <Redirect to={`/restaurant/${getRandomRestaurantId()}`}/>;
const About = ({history}) => (
    <MicroFrontend history={history} host={aboutHost} name="About" />
);

const Vue = ({history}) => (
    <MicroFrontend history={history} host={vueHost} name="Vue" />
)

const App = () => (
    <BrowserRouter>
        <React.Fragment>
            <AppHeader/>
            <Switch>
                <Route exact path="/" component={Browse}/>
                <Route exact path="/restaurant/:id" component={Restaurant}/>
                <Route exact path="/random" render={Random}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/vue" component={Vue}/>
            </Switch>
        </React.Fragment>
    </BrowserRouter>
);

export default App;
