import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'; 
import { InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        // marginLeft: theme.spacing(1),
        flex: 1,
        width: 300,
    },
    iconButton: {
        padding: 5,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    paper: {
        width: 350
    }
});




class CreateNewSearchBar extends Component {

    

    render() {

        const { classes } = this.props;

        return (

            <Paper className={classes.paper}>
                <InputBase className={classes.input} placeholder="search books..." />
                <SearchIcon className={classes.iconButton} />
           </Paper>
                
         
        )
    }
}

CreateNewSearchBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles) (CreateNewSearchBar);