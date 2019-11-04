import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookDetails from '../BookDetails/BookDetails';
import UsernameSearch from '../UsernameSearch/UsernameSearch';
import DiscussionBoard from '../DiscussionBoard/DiscussionBoard';
import { Card, Grid } from '@material-ui/core';



class ClubPage extends Component {
    // COMPONENT DID MOUNT TO GET CURRENT BOOK CLUB BASED ON ID
    componentDidMount() {
        this.getClubPageDetails();
        // this.getMembersToDisplay();
    }

    getClubPageDetails = () => {
        console.log('in get club page details for id:', this.props.match.params.id);
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


            <div >
                <h1>{this.props.details.name}</h1>
                
                <Grid container spacing={3}>
    
                    <Grid item xs={6}>
                        <Grid item={12}>
                            <Card>
                            <BookDetails details={this.props.details}  />
                            </Card>
                        </Grid>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {this.props.details.admin_status ? < UsernameSearch clubId={this.props.match.params} /> : <> </> }
                                
                            </Grid>
                        </Grid>
                        
                    </Grid>
        
                    <Grid item xs={6}>
                        <DiscussionBoard clubId={this.props.match.params}/>
                    </Grid>

                </Grid>
                     
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        details: reduxStore.singleBookReducer,
    }
}

export default connect(mapStateToProps) (ClubPage);