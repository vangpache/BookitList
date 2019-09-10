import React, { Component } from 'react';
import { Button, Card, CardContent, TextField  } from '@material-ui/core';


class DiscussionBoard extends Component {

    

    render() {


        return (

            <div>
                <Card>
                    <CardContent>
                        <h2>Discussion Board</h2>
                        <TextField variant="filled" placeholder="Write something for the board..." />
                        <Button variant="outlined">Post</Button>
                        <Card>
                            <CardContent>
                                <p>user posts render here</p>
                            </CardContent>
                        </Card>

                    </CardContent>
                </Card>
                
            </div>
        )
    }
}

export default DiscussionBoard;