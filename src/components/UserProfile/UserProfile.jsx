import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react';
import { Button, TextField } from '@material-ui/core';
import profileImage from './profile.jpg'


class UserProfile extends Component {
    state = {
        edit: true,
    }

    handleEdit = () => {
        if (this.state.edit === false) {
            this.setState({
                edit: true
            })
        } else {
            this.setState({
                edit: false
            })
        }
        
    }


    render() {



        return (
            <>
                {!this.state.edit ? 
                <>
                <img src={profileImage} alt="user profile image" width="150px" className="profileImage" />
                <Button onClick={this.handleEdit}>Edit Profile</Button>
                
                <h4>User: {this.props.user.username}</h4>
                <h4>Favorite Author: Roald Dahl</h4></> :
                <>
                <h2>edit me</h2>
                <img src={profileImage} alt="user profile image" width="150px" className="profileImage" />
                <input type="file" />
                <TextField placeholder="Currently reading..." label="Currently reading" />
                <TextField placeholder="Favorite author..." label="Favorite author" />
                <TextField placeholder="Favorite book..." label="Favorite book" />
                <TextField placeholder="Favorite quote..." label="Favorite quote" />
                <Button onClick={this.handleEdit}>Done</Button>
                </>
                }

                {JSON.stringify(this.props.user)}
            </>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        user: reduxStore.user
    }
}

export default connect(mapStateToProps) (UserProfile);