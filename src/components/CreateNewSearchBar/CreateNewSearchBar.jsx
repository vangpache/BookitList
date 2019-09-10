import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'; 
import { InputBase, Paper, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Book from '@material-ui/icons/Book';


const styles = theme => ({
    input: {
        flex: 1,
        width: 300,
    },
    iconButton: {
        padding: 5,
    },
    paper: {
        width: 375
    },
});


class CreateNewSearchBar extends Component {

    render() {

        const { classes } = this.props;

        return (

            <Paper className={classes.paper}>
                <Book />
                <InputBase className={classes.input} placeholder="search books..." />
                <IconButton className={classes.iconButton}>
                    <SearchIcon   />
                </IconButton>
           </Paper>   
         
        )
    }
}

CreateNewSearchBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles) (CreateNewSearchBar);