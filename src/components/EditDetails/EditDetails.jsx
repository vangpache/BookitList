import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import CreateNewSearchBar from '../CreateNewSearchBar/CreateNewSearchBar';
import { withRouter } from 'react-router-dom';
// import UsernameSearch from '../UsernameSearch/UsernameSearch';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { classes } from 'istanbul-lib-coverage';


//GRID LIST IMPORTS
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const styles = {
    textField: {
        width: 500,
        margin: '20px'
    },
    cancelButton: {
        margin: '20px',
        float: 'left'
    },
    editButton: {
        margin: '20px',
        float: 'right',
    } 
}

class EditDetails extends Component {
    componentDidMount() {
        this.getClubPageDetails();
    }


    state = {
        clubId: this.props.match.params.id,
        book_title: this.props.details.book_title,
        author: this.props.details.author,
        image_url: this.props.details.image_url,
        name: this.props.details.name,
        description: this.props.details.description,
    }

    getClubPageDetails = () => {
        console.log('in get club page details for id:', this.props.match.params.id);
        //take the club Id passed and dispatch it to GET book details
        this.props.dispatch({
            type: 'USE_BOOK_ID',
            payload: this.props.match.params.id
        })
    }

    handleClick = (tile) => {
        console.log('book clicked');
        this.setState({

            book_title: tile.best_book.title._text,
            author: tile.best_book.author.name._text,
            image_url: tile.best_book.image_url._text,

        })
    }

    //UPDATE THE CURRENT CLUB DETAILS STATE
    handleChange = (propertyName, event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
        console.log('show state:', this.state);
    }

    //DISPATCH THE UPDATED STATE TO SAGA
    handleCreate = () => {
        this.props.dispatch({
            type: 'UPDATE_CLUB_DETAILS',
            payload: this.state,
            history: this.props.history
        })
        // this.props.history.push('/club')
    }

    handleCancel = () => {
        this.props.history.push(`/club/${this.props.match.params.id}`)
    }

    render() {


        return (


            <div>
                <h1>Edit Club Details:</h1>
                <Grid container spacing={3}>
                    <Grid item xs={6} >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                        <Paper className={classes.paper} >
                            <CreateNewSearchBar />
                        </Paper>
                            </Grid>
                            <Grid item xs={12}>

                                <TextField variant="outlined" type="text" margin="normal"
                                    id="outlined-textarea" className={this.props.classes.textField}
                                    placeholder="Name of cirlce / book title"
                                    defaultValue={this.props.details.name}
                                    onChange={(event) => this.handleChange('name', event)} />
                                <br /><br />
                                <TextField variant="outlined" type="text" margin="normal"
                                    id="outlined-textarea" className={this.props.classes.textField}
                                    placeholder="Description"
                                    defaultValue={this.props.details.description}
                                    onChange={(event) => this.handleChange('description', event)} />
                                <br /><br />
                                <div>
                                    <Button className={this.props.classes.cancelButton} variant="outlined" onClick={() => this.handleCancel(this.props.match.params.id)} >Cancel</Button>
                                    <Button className={this.props.classes.editButton} variant="outlined" onClick={this.handleCreate} >Make Edits</Button>
                                </div>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <div>

                            <Paper >
                                <GridList className={classes.gridList} cols={5} rows={1}>
                                    {this.props.booksList.map(tile => (
                                        <GridListTile key={tile} onClick={() => this.handleClick(tile)} >
                                            <img src={tile.best_book.image_url._text} alt={tile.best_book.title._text} />
                                            <GridListTileBar
                                                title={tile.best_book.title._text}
                                                classes={{
                                                    root: classes.titleBar,
                                                    title: classes.title,
                                                }}

                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>

                            </Paper>

                        </div>
                    </Grid>
                </Grid>

            </div>
        )
    }
}


const mapStateToProps = reduxStore => {
    return {
        booksList: reduxStore.booksReducer,
        details: reduxStore.singleBookReducer
    }
}

export default withRouter (connect(mapStateToProps)(withStyles(styles)(EditDetails)));