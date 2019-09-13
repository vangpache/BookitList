import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardContent, TextField  } from '@material-ui/core';



class DiscussionBoard extends Component {

    componentDidMount() {
        this.handleGetDiscussion();
    }

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

    handleGetDiscussion = () => {
        console.log('in handleGetDiscussion');
        this.props.dispatch({
            type: 'GET_DISCUSSION_BOARD',
            payload: this.state.clubId.id
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
                                {this.props.discussionBoard.map(post => (
                                    <p>username: {post.content}</p>
                                ))}
                            </CardContent>
                        </Card>

                    </CardContent>
                </Card>
                
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        discussionBoard: reduxStore.discussionBoardReducer
    }
}

export default connect(mapStateToProps) (DiscussionBoard);