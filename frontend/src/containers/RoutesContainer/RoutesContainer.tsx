import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { BooksContainer } from '../BooksContainer/BooksContainer';
import { SingleBookContainer } from '../SingleBookContainer/SingleBookContainer';
import { ReaderContainer } from '../ReaderContainer/ReaderContainer';

const routes = [
    { path: '/books', component: BooksContainer },
    { path: '/books/:id', component: SingleBookContainer },
    { path: '/books/:id/reader', component: ReaderContainer },
    { path: '/authors', component: () => <div>Authors</div> },
    { path: '/authors/:id', component: () => <div>Author Single</div> },
];

const RoutesContainer = () => {
    return (
        <Switch>
            {routes.map(({path, component: Component}) => (
                <Route key={path} exact path={path}>
                    <Component />
                </Route>
            ))}
        </Switch>
    );
};

export { RoutesContainer };