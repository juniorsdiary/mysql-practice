import React from 'react';
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import { createStyles, makeStyles } from "@material-ui/core/styles";

export const links = [
    { href: '/books', title: "Books" },
    { href: '/authors', title: "Authors" },
    { href: '/tags', title: "Tags" },
];

const useStyles = makeStyles(() =>
    createStyles({
        drawer: {
            width: 200,
            flexShrink: 0,
        },
        drawerPaper: {
            width: 200,
        },
        drawerContainer: {
            overflow: 'auto',
        }
    }),
);

const NavigationContainer = (): JSX.Element => {
    const classes = useStyles();

    return (
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
                    {links.map(link => (
                        <ListItem button component={(props) => <Link to={link.href} {...props} />} key={link.href}>
                            {link.title}
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
};

export { NavigationContainer };