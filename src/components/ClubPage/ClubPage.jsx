import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookDetails from '../BookDetails/BookDetails';
import UsernameSearch from '../UsernameSearch/UsernameSearch';
import DiscussionBoard from '../DiscussionBoard/DiscussionBoard';
import { Button, Card, CardContent, Grid } from '@material-ui/core';



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

    // handleLeave = (id) => {
    //     console.log('leave button clicked:', id);
    //     this.props.dispatch({
    //         type: 'LEAVE_BOOK',
    //         payload: id,
    //         history: this.props.history
    //     })   
    // }

    



    render() {

        const { id } = this.props.match.params
        console.log('the book id is:', id);
        


        return (


            <div >
                <h1>{this.props.details.name}</h1>
                
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <Grid item xs={12} >

                            <BookDetails details={this.props.details} />
                            {/* {this.props.details.admin_status ?
                            <Button variant="outlined">Edit</Button> :
                            <Button onClick={() => this.handleLeave(this.props.match.params)}>Leave Club</Button>} */}
                        </Grid>

                        <Grid item xs={12}>
                            <UsernameSearch clubId={this.props.match.params} />
                        </Grid>

                    </Grid>
        
                    <Grid item xs={7}>
                        <DiscussionBoard clubId={this.props.match.params}/>
                    </Grid>
                </Grid>
                
                
                {/* {JSON.stringify(this.props.details)} */}
                {/* <Grid Container spacing={3}>
                    
                </Grid> */}
            
                
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