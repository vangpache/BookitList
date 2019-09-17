import React, { Component } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';



class BookDetails extends Component {




    handleLeave = (id) => {
        console.log('leave button clicked:', id);
        this.props.dispatch({
            type: 'LEAVE_BOOK',
            payload: id,
            history: this.props.history
        })
    }

    render() {


        return (

            <div>
                
                        <Card>
                            <CardContent>
                                <h4>Book: {this.props.details.book_title} </h4>
                                <img src={this.props.details.image_url} alt="book cover"/>
                                <h5>Author: {this.props.details.author} </h5>

                        {this.props.details.admin_status ?
                            <Button variant="outlined">Edit</Button> :
                            <Button onClick={() => this.handleLeave(this.props.match.params)}>Leave Club</Button>}
                            </CardContent>
                        </Card>
               
            </div>
        )
    }
}

export default BookDetails;