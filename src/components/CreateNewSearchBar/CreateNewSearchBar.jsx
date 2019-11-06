import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        width: 375,
  
    },
    divContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: '5px'
    }
});


class CreateNewSearchBar extends Component {

    state = {
        search: ''
    }


    handleSearchQuery = (event) => {
        this.setState({
            search: event.target.value
        })
        console.log('in search query:', this.state.search);
    }

    handleClick = () => {
        console.log('search button clicked');
        this.props.dispatch({
            type: 'SEARCH_GOODREADS',
            payload: this.state.search
        })
        
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={this.props.classes.divContainer} >
                <div>
                    <Book />
                    <InputBase className={classes.input} placeholder="search books..." onChange={this.handleSearchQuery}/>
                    <IconButton className={classes.iconButton} onClick={this.handleClick}>
                        <SearchIcon  />
                    </IconButton>
                </div>
            </div>
              
         
        )
    }
}

CreateNewSearchBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect () (withStyles(styles) (CreateNewSearchBar));