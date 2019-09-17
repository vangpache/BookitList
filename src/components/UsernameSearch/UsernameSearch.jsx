import React, { Component } from 'react';
import { Button, Card, CardContent, TextField } from '@material-ui/core';
import { connect } from 'react-redux';


class UsernameSearch extends Component {

    state = {
        search: {
            query:''
        },
        invited: [],
    }

    getInfo = () => {
        this.props.dispatch({
            type: 'GET_USERNAMES',
            payload: this.state.search.query
        })
    }



    handleInputChange = () => {
        this.setState({
            search:{
                query: this.search.value
            }
        }, () => {
            if (this.state.search.query && this.state.search.query.length > 1) {
                    this.getInfo()  
            }
        })
        console.log('in username search query:', this.state);
    }

    //ON CLICK --> TAKES THE USER IN THE REDUCER AND ADDS TO A STATE THAT WILL DISPATCH UPON CREATE NEW BUTTON TO A NEW REDUCER THAT COLLECTS ALL USERS INVITED
    handleAddUser = () => {
        console.log('add user button clicked');
        this.setState ({
            invited: [...this.state.invited, {
                user_id: this.props.users.id,
                username: this.props.users.username 
            }]
        })
        // this.inviteUsers();
    }

    //ADDS USER IN STATE TO THE INVITE-USERS-REDUCER ONLY ; DOES NOT DISPATCH TO DB
    // inviteUsers = () => {
    //     this.props.dispatch({
    //         type: 'INVITE_USER',
    //         payload: this.state.invited
    //     })
    // }


    //INVITE USERS TO JOIN CLUB
    handleInvites = (id) => {
        console.log('invite users button clicked');
        this.props.dispatch({
            type: 'SEND_INVITES',
            payload: this.state.invited,
            clubId: id
        })
    }
    

    render () {


        return (
            <>
            <Card>
                <CardContent>
                        <h1>Add new members:</h1>
                        
                            <input variant="filled" type="text" placeholder="search for users..."
                                ref={input => this.search = input}
                                onChange={this.handleInputChange} />

                        {!this.props.users.username ?  
                        <span>bye</span> :
                            <span>{this.props.users.username}
                                <Button variant="outlined" onClick={this.handleAddUser}>Add user</Button></span>}

                            <ul>
                                {this.state.invited.map(username => (
                                    <li>
                                        {username.username}
                                        <Button>remove</Button>
                                    </li>
                                ))}
                            </ul>
                        
                        <Button variant="outlined" onClick={() => this.handleInvites(this.props.clubId)}>Invite Users</Button><br/>
                        {JSON.stringify(this.props.users)}
                        {JSON.stringify(this.state.invited)}
                        {JSON.stringify(this.props.inviteList)}
                </CardContent>
            </Card>
                
                    
               
            </>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        users: reduxStore.searchUsersReducer,
        inviteList: reduxStore.inviteUsersReducer
    }
}

export default connect(mapStateToProps) (UsernameSearch);