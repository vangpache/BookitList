import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import CreateNewSearchBar from '../CreateNewSearchBar/CreateNewSearchBar';
import { withRouter } from 'react-router-dom';
// import UsernameSearch from '../UsernameSearch/UsernameSearch';

import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Paper, Grid } from '@material-ui/core';
import { classes } from 'istanbul-lib-coverage';


//GRID LIST IMPORTS
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const styles = {
    textField: {
        width: 500,
    },
    cancelButton: {
        margin: '20px',
        float: 'left'
    },
    editButton: {
        margin: '20px',
        float: 'right',
    },
    container: {
        paddingLeft: '30px',
        backgroundColor: '#f7be16',
        borderRadius: '5px',
    },
    cardContent: {
        margin: 'auto',
    },
    bookSelection: {
        height: '280px',
        overflowY: 'scroll',
        backgroundColor: '#e8e8e8',
        paddingLeft: '20px',
        borderRadius: '5px',
        marginBottom: '10px',
    }
}

class EditDetails extends Component {
    componentDidMount() {
        this.getClubPageDetails();
        this.setState({
        book_title: this.props.details.book_title,
        author: this.props.details.author,
        image_url: this.props.details.image_url,
        name: this.props.details.name,
        description: this.props.details.description,
        })
    }


    state = {
        clubId: this.props.match.params.id,
        cancelSelection: false
        
    }

    getClubPageDetails = () => {
        this.props.dispatch({
            type: 'USE_BOOK_ID',
            payload: this.props.match.params.id
        })
    }

    handleClick = (tile) => {
        this.setState({
            cancelSelection: true,
            book_title: tile.best_book.title._text,
            author: tile.best_book.author.name._text,
            image_url: tile.best_book.image_url._text,

        })
    }
    handleCancelSelection = () => {
        this.setState({
                book_title: this.props.details.book_title,
                author: this.props.details.author,
                image_url: this.props.details.image_url,
                name: this.props.details.name,
                description: this.props.details.description,
                cancelSelection: false
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
    }

    handleCancel = () => {
        this.props.history.push(`/club/${this.props.match.params.id}`)
    }


    render() {


        return (


            <div className={this.props.classes.container}>
                <h1 >Edit Reading Circle:</h1>
                <Grid container spacing={3}>
                    <Grid item xs={6} >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            <CreateNewSearchBar />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent className={this.props.classes.cardContent}>
                                <div className={this.props.classes.bookSelection}>
                                    {!this.state.cancelSelection ?
                                        <div>
                                            <h3>current book selection:</h3>
                                            <p>
                                            {this.props.details.book_title} < br />
                                            by {this.props.details.author}<br /><br/>
                                            <img src={this.props.details.image_url} alt="book cover" />
                                                    </p>
                                        </div> :
                                        <div>
                                            <h3>New book selection:</h3>
                                            {this.state.book_title}<br />
                                            by {this.state.author}<br />
                                            <img src={this.state.image_url} alt="book cover" /><br />
                                            <button onClick={this.handleCancelSelection}>cancel</button>
                                        </div>
                                    }
                                </div>

                                <div>
                                    <label>Edit circle name:</label><br/>
                                <TextField variant="outlined" type="text" margin="normal"
                                    id="outlined-textarea" className={this.props.classes.textField}
                                    placeholder="Name of cirlce / book title"
                                    defaultValue={this.props.details.name}
                                    onChange={(event) => this.handleChange('name', event)} />
                                <br /><br />
                                <label>Edit circle description:</label>
                                <TextField variant="outlined" type="text" margin="normal"
                                    id="outlined-textarea" className={this.props.classes.textField}
                                    placeholder="Description"
                                    defaultValue={this.props.details.description}
                                    onChange={(event) => this.handleChange('description', event)} />
                                <br /><br />
                                </div>
                                <div>
                                    <Button className={this.props.classes.cancelButton} variant="outlined" onClick={() => this.handleCancel(this.props.match.params.id)} >Cancel</Button>
                                    <Button className={this.props.classes.editButton} variant="outlined" onClick={this.handleCreate} >Make Edits</Button>
                                </div>
                                    </CardContent>
                                </Card>
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