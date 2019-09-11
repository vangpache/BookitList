import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import CreateNewSearchBar from '../CreateNewSearchBar/CreateNewSearchBar';

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
  
});


class CreateNew extends Component {


    render() {

      
        return (
            <div>
                <h1>Create a New Book Club:</h1>
                <Grid container spacing={3}>
                    <Grid item xs={6} >
                        <Paper className={classes.paper} >
                            <CreateNewSearchBar />
                        </Paper>
                    </Grid>
                            
                                {/* {this.props.booksList.map(each => {
                                    return (
                                        <>
                                            <p>{each.best_book.title._text}</p>
                                            <p>by: {each.best_book.author.name._text}</p>
                                            <img src={each.best_book.image_url._text} alt="insert description of book here" />
                                        </>
                                    )
                                })} */}

                                {/* {JSON.stringify(this.props.booksList)} */}
                    

                            
                    <Grid  item xs={6}>
                        <div className={classes.gridListPaper}>
                                    <Paper >
                                <GridList className={classes.gridList} cols={5} rows={1}>
                                    {this.props.booksList.map(tile => (
                                        <GridListTile key={tile}>
                                            <img src={tile.best_book.image_url._text} alt={tile.best_book.title._text} />
                                            <GridListTileBar
                                                title={tile.best_book.title._text}
                                                classes={{
                                                    root: classes.titleBar,
                                                    title: classes.title,
                                                }}
                                                // actionIcon={
                                                //     <IconButton aria-label={`star ${tile.title}`}>
                                                //         <StarBorderIcon className={classes.title} />
                                                //     </IconButton>
                                                // }
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            
                        </Paper>
                        {/* </div> */}
                        </div>
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

const mapStateToProps = reduxStore => {
    return {
        booksList: reduxStore.booksReducer
    }
}

export default connect(mapStateToProps) (withStyles(styles)(CreateNew));