import React  from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { BooksContainer } from './containers/BooksContainer/BooksContainer';
import { SingleBookContainer } from './containers/SingleBookContainer/SingleBookContainer';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const routes = [
    { href: 'books', title: "Books" },
    { href: 'authors', title: "Authors" },
    { href: 'tags', title: "Tags" },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: 200,
            flexShrink: 0,
        },
        drawerPaper: {
            width: 200,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        }
    }),
);

function App() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Books Reader
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            {routes.map(link => (
                                <ListItem button component={(props) => <Link to={link.href} {...props} />} key={link.href}>
                                    {link.title}
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Switch>
                        <Route exact path="/books">
                            <BooksContainer />
                        </Route>
                        <Route exact path="/books/:id">
                            <SingleBookContainer />
                        </Route>
                        <Route path="/authors">
                            <div>Authors</div>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default React.memo(App);
