import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
});

class MyClubsGrid extends Component {

    render() {
        return (
            <div className={classes.root}>
                
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <h3>Current Clubs</h3>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Card >
                                        <h4>most current club here</h4>
                                    </Card>
                                    
                                </Grid>
                                <Grid item xs>
                                    <Card>
                                        <CardContent>
                                            <h4>Details of most current club here</h4>
                                            <h6>Book:</h6>
                                            <h6>Author:</h6>
                                        </CardContent>
                                    </Card>
                                    
                                </Grid>
                            </Grid>
                            </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                          
                            <Card>
                                <h3>Hi, there you are.</h3>   
                                <p>List of clubs here by date</p>
                                <ul>
                                    <Link to="/club"><li>Book 1</li></Link>
                                    <li>Book 2</li>
                                    <li>Book 3</li>
                                    <li>Book 4</li>
                                </ul>
                            </Card>
                  
                        </Paper>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}
const classes = withStyles();



export default withStyles(styles)(MyClubsGrid);