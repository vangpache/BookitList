import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class MyClubsGrid extends Component {

    render() {
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    
                    <Grid item xs={6}>

                        <Paper className={classes.paper}>
                            <h3>Hi, here I am.</h3>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <h4>most current club here</h4>
                                </Grid>
                                <Grid item xs>
                                    <h4>Details of most current club here</h4>
                                </Grid>
                            </Grid>
                            </Paper>

                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}><h3>Hi, there you are.</h3></Paper>

                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}
const classes = withStyles();



export default withStyles(styles)(MyClubsGrid);