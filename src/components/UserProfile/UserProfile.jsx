import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react';
import { Button } from '@material-ui/core';
import profileImage from './profile.jpg'


class UserProfile extends Component {



    render() {



        return (
            <>
                {/* <h2 className="userProfileHome">user profile exists here</h2> */}
                <img src={profileImage} alt="user profile image" width="150px" className="profileImage" />
                <Button>Edit Profile</Button>
                
                <h4>User: {this.props.user.username}</h4>
                <h4>Favorite Author: Roald Dahl</h4>
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