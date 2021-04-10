import ROUTES_NAMES from '../const/routes.names';
import { booksRoute } from './books.route';
import { authorsRoute } from './authors.route';
import { tagsRoute } from './tags.route';
import { searchRoute } from './search.route';
import { Express } from 'express';

const routesData = [
    {
        routeName: ROUTES_NAMES.BOOKS,
        routeController: booksRoute
    },
    {
        routeName: ROUTES_NAMES.AUTHORS,
        routeController: authorsRoute
    },
    {
        routeName: ROUTES_NAMES.TAGS,
        routeController: tagsRoute
    },
    {
        routeName: ROUTES_NAMES.SEARCH,
        routeController: searchRoute
    },
]

const applyRoutes = (app: Express) => routesData.forEach(routeData => app.use(routeData.routeName, routeData.routeController));

export {
    applyRoutes
}