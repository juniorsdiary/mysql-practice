import React  from 'react';

import {
    BrowserRouter as Router,
} from 'react-router-dom';

import { RoutesContainer } from './containers/RoutesContainer/RoutesContainer';
import { NavigationContainer } from './containers/NavigationContainer/NavigationContainer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {
    createMuiTheme,
    makeStyles,
    createStyles,
    ThemeProvider,
    Theme
} from '@material-ui/core/styles';

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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});

function App() {
    const classes = useStyles();

    return (
        <Router>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </Router>
    );
}

export default React.memo(App);
