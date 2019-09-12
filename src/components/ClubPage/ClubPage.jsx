import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookDetails from '../BookDetails/BookDetails';
import DiscussionBoard from '../DiscussionBoard/DiscussionBoard';
import { Button, Grid } from '@material-ui/core';



class ClubPage extends Component {



    render() {



        return (


            <div className="" >
                <h1>Name of Club/book</h1>
                <Grid container spacing={3}>
                    <Grid item xs={5} >
                        <BookDetails />
                    </Grid>
                    
                    <Grid item xs={7}>
                        <DiscussionBoard />
                    </Grid>
                </Grid>
                <Button variant="outlined">Edit</Button>
                {JSON.stringify(this.props.clubId)}
                
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        clubId: reduxStore.newClubReducer
    }
}

export default connect(mapStateToProps) (ClubPage);