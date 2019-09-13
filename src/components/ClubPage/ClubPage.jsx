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
        console.log('in get club page details for id:', this.props.match.params.id);
        //take the club Id passed and dispatch it to GET book details
        this.props.dispatch({
            type: 'USE_BOOK_ID',
            payload: this.props.match.params.id
        })
    }

    handleLeave = (id) => {
        console.log('leave button clicked:', id);
        this.props.dispatch({
            type: 'LEAVE_BOOK',
            payload: id,
            history: this.props.history
        })   
    }

    



    render() {

        const { id } = this.props.match.params
        console.log('the book id is:', id);
        


        return (


            <div >
                <h1>{this.props.details.name}</h1>
                
                <Grid container spacing={3}>
                    <Grid item xs={5} >
                        <BookDetails details={this.props.details} />
                    </Grid>
                    
                    <Grid item xs={7}>
                        <DiscussionBoard clubId={this.props.match.params}/>
                    </Grid>
                </Grid>
                {this.props.details.admin_status ? 
                <Button variant="outlined">Edit</Button> : 
                <Button onClick={() => this.handleLeave(id)}>Leave Club</Button>}
                
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