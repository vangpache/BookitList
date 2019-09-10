import React, { Component } from 'react';
import { Card, CardContent } from '@material-ui/core';



class BookDetails extends Component {


    render() {


        return (

            <div>
                
                        <Card>
                            <CardContent>
                                <h4>Details here</h4>
                                <h6>Book:</h6>
                                <h6>Author:</h6>
                            </CardContent>
                        </Card>
               
            </div>
        )
    }
}

export default BookDetails;