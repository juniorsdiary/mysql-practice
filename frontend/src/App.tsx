import React  from 'react';

import {
    BrowserRouter as Router,
} from 'react-router-dom';

import { RoutesContainer } from './containers/RoutesContainer/RoutesContainer';
import { NavigationContainer } from './containers/NavigationContainer/NavigationContainer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
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
                <NavigationContainer />
                <main className={classes.content}>
                    <RoutesContainer />
                </main>
            </div>
        </Router>
    );
}

export default React.memo(App);
