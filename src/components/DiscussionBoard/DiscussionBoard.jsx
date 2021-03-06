import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Moment from 'react-moment';
import { PersonOutline } from '@material-ui/icons';
import { Button, Card, CardContent, TextField  } from '@material-ui/core';
import './DiscussionBoard.css';

const styles = {
    board: {
        backgroundColor: '#305f72',
        height: '500px'
    },
    textField: {
        backgroundColor: 'white',
        overflowY: 'scroll',
        height: '56px'
    },
    card: {
        margin: '10px 0px 10px 0px',
        height: '230px',
        overflowY: 'scroll',
    },
    postButton: {
        backgroundColor: '#f7be16'
    }
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
                    <CardContent className={this.props.classes.board} >
                        <div className="discussionHeadingMembersDiv">
                        <div >
                        <h2>Discussion Board</h2>
                        </div>
                        <div className="showMembers" >
                            <p>members</p>
                            <ul className="ul" >
                                {this.props.members.map(username => (
                                    
                                    <li><img src={username.profile_image} alt="user profile image" className="membersProfile" /> {username.username}</li>
                                ))}
                            </ul>
                        </div>
                        </div>
                        <TextField id="outlined-textarea" label="Post a new message"
                                    multiline className={this.props.classes.textField}
                                    margin="normal" variant="outlined" fullWidth={true}
                                    placeholder="Post a new message..."
                                    value={this.state.content}
                                    onChange={this.handleChange} />
                        <Button className={this.props.classes.postButton} variant="outlined" onClick={this.handleClick} >Post</Button>
                        <Card className={this.props.classes.card} >
                            <CardContent className={this.props.classes.cardContent}>
                                {/* <p>user posts render here</p> */}
                                {this.props.discussionBoard.map(post => (
                                    <p><span>{post.username}:</span> {post.content} <span> <Moment format="LLLL">{post.date}</Moment> </span></p> 
                                ))}
                            </CardContent>
                        </Card>

                    </CardContent>
                </Card>
                {/* {JSON.stringify(this.props.members)} */}
                
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        discussionBoard: reduxStore.discussionBoardReducer,
        members: reduxStore.membersReducer
    }
}

export default withStyles(styles) (connect(mapStateToProps) (DiscussionBoard));