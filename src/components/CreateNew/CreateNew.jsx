import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import CreateNewSearchBar from '../CreateNewSearchBar/CreateNewSearchBar';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { classes } from 'istanbul-lib-coverage';




const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    searchBarDiv: {
        textAlign: 'center'
    },
  
});

class CreateNew extends Component {


    render() {

      
        return (
            <div>
                <h1>Create a New Book Club:</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Paper className={classes.paper} >
                            <CreateNewSearchBar />
                        </Paper>
                    </Grid>
                </Grid>
                
               
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper>
                        <div>
                            <TextField variant="filled" type="text" placeholder="Name of cirlce / book title" /><br /><br />
                            <TextField variant="filled" type="text" placeholder="Description" /><br /><br />
                            Notes:<br />
                            <TextField variant="filled" type="text" placeholder="let clubbers know when and where to meet" /><br /><br />
                        </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>                       
                        <Paper>
                                <TextField variant="filled" type="text" placeholder="invite users" />
                                <h4>users show up here</h4>
                                <Button variant="outlined">Delete User</Button>
                        </Paper>
                    </Grid>
                </Grid>
                <div>
                    <Button variant="outlined" color="primary">Cancel</Button>
                    <Button variant="outlined">Create New</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(CreateNew);