import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import CreateNewSearchBar from '../CreateNewSearchBar/CreateNewSearchBar';
// import UsernameSearch from '../UsernameSearch/UsernameSearch';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { classes } from 'istanbul-lib-coverage';


//GRID LIST IMPORTS
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';





const styles = theme => ({
    root: {
        // flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    searchBarDiv: {
        textAlign: 'center'
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    textField: {
        width: 500,
        margin: '20px'
    },
    cancelButton: {
        margin: '20px',
        alignItem: 'left'
    },
    createButton: {
        margin: '20px',
        // alignItem: 'right'
    }
  
});


class CreateNew extends Component {


    state = {
        
            book_title: '',
            author: '',
            image_url: '',
            name: '',
            description: '',
            invite_accepted: true,
            admin_status: true
    }

    handleCancel = () => {
        this.props.history.push('/')
    }

    handleClick = (tile) => {
        console.log('book clicked');
        this.setState({
            
                book_title: tile.best_book.title._text,
                author: tile.best_book.author.name._text,
                image_url: tile.best_book.image_url._text,
            
        })       
    }

    //SET THE NEW CLUB DETAILS STATE
    handleChange = (propertyName, event) => {
        this.setState({
                ...this.state,
                [propertyName]: event.target.value 
        })
        console.log('show state:', this.state);   
    }


    //DISPATCH THE STATE TO SAGA
    handleCreate = () => {
        this.props.dispatch({
            type: 'POST_NEWCLUB',
            payload: this.state,
            history : this.props.history
        })
        this.setState({
            book_title: '',
            author: '',
            image_url: '',
            name: '',
            description: '',
            invite_accepted: true,
            admin_status: true
        })
    }

    render() {

      
        return (
            <div>
                <h1>Create a New Circle:</h1>
                <Grid container spacing={3}>
                    <Grid item xs={6} >
                        {/* <Paper className={classes.paper} > */}
                            <CreateNewSearchBar />
                        {/* </Paper> */}
                    </Grid>
                            
                    <Grid  item xs={6}>
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
                
               
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper>
                            <div>
                                          
                            <TextField  id="outlined-textarea" label="name of circle"
                                        className={this.props.classes.textField}
                                        margin="normal" variant="outlined" type="text" 
                                        placeholder="Name of cirlce / book title" value={this.state.name}
                                        // value={this.state.newClub.name}
                                        onChange={(event) => this.handleChange('name', event)} />
                            <br /><br />
                            <TextField  id="outlined-textarea" label="description"
                                        multiline className={this.props.classes.textField}
                                        margin="normal" variant="outlined" type="text" 
                                        placeholder="Description" value={this.state.description}
                                        // value={this.state.newClub.description}
                                        onChange={(event) => this.handleChange('description', event)} />
                            <br /><br />
                                <div className={this.props.classes.buttonsDiv} >
                                    <Button className={this.props.classes.cancelButton} variant="outlined" color="primary" onClick={this.handleCancel}>Cancel</Button>
                                    <Button className={this.props.classes.createButton} variant="outlined" onClick={this.handleCreate} >Create New</Button>
                                </div>
                            
                            </div>
                        </Paper>
                    </Grid>

                    {/* <Grid item xs={6}>                       
                        <Paper> */}
                            {/* <UsernameSearch /> */}
                                {/* <TextField variant="filled" type="text" placeholder="invite users" value="hey" />
                                <h4>users show up here</h4>
                                <Button variant="outlined">Delete User</Button> */}
                        {/* </Paper>
                    </Grid> */}
                </Grid>
                
                
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        booksList: reduxStore.booksReducer,
    }
}

export default connect(mapStateToProps) (withStyles(styles)(CreateNew));