import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookDetails from '../BookDetails/BookDetails';
import DiscussionBoard from '../DiscussionBoard/DiscussionBoard';
import { Button, Grid } from '@material-ui/core';



class ClubPage extends Component {
    // COMPONENT DID MOUNT TO GET CURRENT BOOK CLUB BASED ON ID
    componentDidMount() {
        this.getClubPageDetails();
    }

    getClubPageDetails = () => {
        console.log('in get club page details');
        //take the club Id passed and dispatch it to GET book details
        this.props.dispatch({
            type: 'USE_BOOK_ID',
            payload: this.props.match.params.id
        })
    }

    



    render() {

        const { id } = this.props.match.params
        console.log('the book id is:', id);
        


        return (


            <div className="" >
                <h1>Name of Club/book</h1>
                
                <Grid container spacing={3}>
                    <Grid item xs={5} >
                        <BookDetails details={this.props.details} />
                    </Grid>
                    
                    <Grid item xs={7}>
                        <DiscussionBoard />
                    </Grid>
                </Grid>
                <Button variant="outlined">Edit</Button>
                {JSON.stringify(this.props.details)}
            
                
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.singleBookReducer
    }
}

export default connect(mapStateToProps) (ClubPage);