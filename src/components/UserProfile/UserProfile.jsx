import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react';
import { Button, TextField } from '@material-ui/core';
import profileImage from './profile.jpg'


class UserProfile extends Component {
    componentDidUpdate(prevProps) {
        if(this.props.user !== prevProps.user) {
            console.log('changes to user profile updated');
        }
    }

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

    handleWidget= () => {
        let myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dquorievt',
            uploadPreset: 'xln2ffrv'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info);
                this.props.dispatch({
                    type: 'ADD_PROFILE_IMAGE',
                    payload: result.info
                })
            }
        }
        )
        myWidget.open();
    }
   


    render() {

        
    


        return (
            <>
                {!this.state.edit ? 
                <>
                <img src={this.props.user.profile_image} alt="user profile image" width="150px" className="profileImage" />
                <Button onClick={this.handleEdit}>Edit Profile</Button>
                
                <h4>User: {this.props.user.username}</h4>
                <h4>Favorite Author: Roald Dahl</h4></> :
                <>
                <h2>edit me</h2>
                <img src={this.props.user.profile_image} alt="user profile image" width="150px" className="profileImage" />
                {/* <input type="file" /> */}
                <button id="upload_widget" className="cloudinary-button" onClick={this.handleWidget} >Upload New Picture</button>
                
                <TextField placeholder="Currently reading..." label="Currently reading" />
                <TextField placeholder="Favorite author..." label="Favorite author" />
                <TextField placeholder="Favorite book..." label="Favorite book" />
                <TextField placeholder="Favorite quote..." label="Favorite quote" /><br/>
                <Button onClick={this.handleEdit}>Done</Button><br/>
                </>
                }
       
                {JSON.stringify(this.props.user.profile_image)}
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