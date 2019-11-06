import React, { Component } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
    addButton: {
        margin: '20px;'
    },
    heading: {
        display: 'inline-block',
        float: 'right',
        // backgroundColor: 'red',
        width: '400px'
        // padding: '0px'
    },
    inviteHeading: {
        display: 'inline-block',
        paddingRight: '10px'
    }
})


class UsernameSearch extends Component {

    // componentDidUpdate(prevProps) {
    //     if(prevProps.invited !== this.state.invited) {
    //         console.log('changes');
            
    //     }
    // }

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
        swal({
            title: "Sent!",
            icon: "success",
            button: "yay!"
        })
    }

    //DOES NOT RENDER ON UPDATE AT THIS MOMENT
    handleRemove = (name) => {        
        let invites = this.state.invited
        for( let i = 0; i < invites.length; i++) {
            if (invites[i].username === name) {
                invites.splice(i, 1)
          } else {
              console.log('NOO THERE');
          }
        }
        console.log('end of loop', this.state.invited)
    }

    

    render () {


        return (
            <>
                {/* <Card > */}
                {/* {JSON.stringify(this.props)} */}
                    <CardContent className={this.props.classes.heading}>
                        
                        
                            <input variant="filled" type="text" placeholder="search for users..."
                                ref={input => this.search = input} value={this.state.search.query}
                                onChange={this.handleInputChange} /><br/>

                        {!this.state.search.query ?  
                            <span>invite friends to join this circle...</span> :
                            <span>{this.props.users.username}
                                <Button variant="outlined" onClick={this.handleAddUser}
                                        className={this.props.classes.addButton} >Add user</Button></span>}

                            <ul>
                                {this.state.invited.map(username => (
                                    <li key={username.id}>
                                        {username.username}
                                        <Button onClick={() => this.handleRemove(username.username)}>remove</Button>
                                    </li>
                                ))}
                            </ul>
                        
                        <Button variant="outlined" color="primary" onClick={() => this.handleInvites(this.props.clubId)}>Send Invites 
                        <SendIcon /></Button><br/>
                </CardContent>
            {/* </Card> */}
                
                    
               
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

export default withStyles(styles) (connect(mapStateToProps) (UsernameSearch));