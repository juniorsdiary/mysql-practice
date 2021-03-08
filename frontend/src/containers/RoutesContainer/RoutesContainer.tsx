import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Toolbar from "@material-ui/core/Toolbar";

import { BooksContainer } from '../BooksContainer/BooksContainer';
import { SingleBookContainer } from '../SingleBookContainer/SingleBookContainer';
import { ReaderContainer } from '../ReaderContainer/ReaderContainer';
import { AuthorsContainer } from '../AuthorsContainer/AuthorsContainer';
import { SingleAuthorContainer } from '../SingleAuthorContainer/SingleAuthorContainer';
import { TagsContainer } from '../TagsContainer/TagsContainer';
import { SingleTagContainer } from '../SingleTagContainer/SingleTagContainer';
import { SearchContainer } from '../SearchContainer/SearchContainer';

export const routes = [
    { path: '/books', component: BooksContainer },
    { path: '/books/:id', component: SingleBookContainer },
    { path: '/books/:id/reader', component: ReaderContainer },
    { path: '/authors', component: AuthorsContainer },
    { path: '/authors/:id', component: SingleAuthorContainer },
    { path: '/tags', component: TagsContainer },
    { path: '/tags/:id', component: SingleTagContainer },
    { path: '/search', component: SearchContainer },
];

const RoutesContainer = (): JSX.Element => {
    return (
        <Switch>
            {routes.map(({path, component: Component}) => (
                <Route key={path} exact path={path}>
                    <Toolbar />
                    <Component />
                </Route>
            ))}
        </Switch>
    );
};

export { RoutesContainer };