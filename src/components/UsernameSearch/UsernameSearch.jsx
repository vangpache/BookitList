import React, { Component } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';


class UsernameSearch extends Component {

    state = {
        search: {
            query:''
        },
        invited: []
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
            }],
            search: {
                query: ''
            }
        })
        this.props.dispatch({
            type: 'ON_SUBMIT_CLEAR'
        })
    }


    //INVITE USERS TO JOIN CLUB
    handleInvites = (id) => {
        console.log('invite users button clicked');
        this.props.dispatch({
            type: 'SEND_INVITES',
            payload: this.state.invited,
            clubId: id
        })
        this.setState({
            search: {
                query: ''
            },
            invited: []
        })
    }
    

    render () {


        return (
            <>
            <Card>
                <CardContent>
                        <h1>Add new members:</h1>
                        
                            <input variant="filled" type="text" placeholder="search for users..."
                                ref={input => this.search = input} value={this.state.search.query}
                                onChange={this.handleInputChange} />

                        {!this.state.search.query ?  
                            <span>search for friends</span> :
                            <span>{this.props.users.username}
                                <Button variant="outlined" onClick={this.handleAddUser}>Add user</Button></span>}

                            <ul>
                                {this.state.invited.map(username => (
                                    <li key={username.id}>
                                        {username.username}
                                        <Button>remove</Button>
                                    </li>
                                ))}
                            </ul>
                        
                        <Button variant="outlined" color="primary" onClick={() => this.handleInvites(this.props.clubId)}>Send Invites 
                        <SendIcon/></Button><br/>
                        {/* {JSON.stringify(this.props.users)}
                        {JSON.stringify(this.state.invited)}
                        {JSON.stringify(this.props.inviteList)} */}
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