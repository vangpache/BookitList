import React, { Component } from 'react';
import { Card, CardContent } from '@material-ui/core';



class BookDetails extends Component {


    render() {


        return (

            <div>
                
                        <Card>
                            <CardContent>
                                <h4>Details here</h4>
                                <img src={this.props.details.image_url} alt="book cover"/>
                                <h6>Book: {this.props.details.book_title} </h6>
                                <h6>Author: {this.props.details.author} </h6>
                            </CardContent>
                        </Card>
               
            </div>
        )
    }
}

export default BookDetails;