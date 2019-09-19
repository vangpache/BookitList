import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Button, Card, CardContent, TextField  } from '@material-ui/core';
import './DiscussionBoard.css';

const styles = {
    textField: {
        border: '#ff9100'
    },
    card: {
        margin: '10px 0px 10px 0px'
    }
    // postButton: {
    //     margin: '15px'
    // }
}

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
        this.handleGetDiscussion();
        this.setState({
            content: ''
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
                        <TextField id="outlined-textarea" label="Post a new message"
                                    multiline className={this.props.classes.textField}
                                    margin="normal" variant="outlined" fullWidth={true}
                                    placeholder="Post a new message..."
                                    value={this.state.content}
                                    onChange={this.handleChange} />
                        <Button className={this.props.classes.postButton} variant="outlined" onClick={this.handleClick} >Post</Button>
                        <Card className={this.props.classes.card} >
                            <CardContent>
                                <p>user posts render here</p>
                                {this.props.discussionBoard.map(post => (
                                    <p><span>{post.username}:</span> {post.content} <span>{post.date}</span></p> 
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

export default withStyles(styles) (connect(mapStateToProps) (DiscussionBoard));