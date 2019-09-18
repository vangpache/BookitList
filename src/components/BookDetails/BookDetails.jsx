import React, { Component } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import { withRouter } from 'react-router-dom';



class BookDetails extends Component {




    handleLeave = (id) => {
        console.log('leave button clicked:', id);
        this.props.dispatch({
            type: 'LEAVE_BOOK',
            payload: id,
            history: this.props.history
        })
    }

    handleEdit = (id) => {
        console.log('handleEdit club id is: ', id);
        this.props.history.push(`/edit/${id.id}`)

    }

    render() {


        return (

            <div>
                
                        <Card>
                            <CardContent>
                                <h4>Book: {this.props.details.book_title} </h4>
                                <h5>Author: {this.props.details.author} </h5>
                                <img src={this.props.details.image_url} alt="book cover"/>
                                <p>Notes: {this.props.details.description}</p>
                                

                        {this.props.details.admin_status ?
                            <Button variant="outlined" onClick={() => this.handleEdit(this.props.match.params)}>Edit</Button> :
                            <Button onClick={() => this.handleLeave(this.props.match.params)}>Leave Club</Button>}
                            </CardContent>
                        </Card>
               
            </div>
        )
    }
}

export default withRouter(BookDetails);