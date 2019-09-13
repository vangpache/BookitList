import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardContent, TextField  } from '@material-ui/core';


class DiscussionBoard extends Component {

    //DISCUSSION BOARD STATE
    state = {
        content: '',
        clubId: this.props.clubId
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
        console.log('typing a post:', this.state);
    }

    handleClick = () => {
        console.log('post button clicked');
        this.props.dispatch({
            type: 'POST_DISCUSSION_CONTENT',
            payload: this.state
        })
    }
    

    render() {


        return (

            <div>
                <Card>
                    <CardContent>
                        <h2>Discussion Board</h2>
                        <TextField variant="filled" placeholder="Write something for the board..."
                                    onChange={this.handleChange} />
                        <Button variant="outlined" onClick={this.handleClick} >Post</Button>
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

export default connect() (DiscussionBoard);