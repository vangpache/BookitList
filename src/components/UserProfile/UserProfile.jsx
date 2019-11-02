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
        currently_reading: '',
        favorite_author: '',
        favorite_book: '',
        favorite_quote: '',
        edit: false,
    }

    handleEdit = () => {
        this.props.dispatch({
            type: 'UPDATE_PROFILE',
            payload: this.state
        })
        if (this.state.edit === false) {
            this.setState({
                currently_reading: this.props.user.currently_reading,
                favorite_author: this.props.user.favorite_author,
                favorite_book: this.props.user.favorite_book,
                favorite_quote: this.props.user.favorite_quote,
                edit: true
            })
        } else {
            this.setState({
                edit: false
            })
        }
        
    }

    handleInputs = (propertyName, event) => {
        this.setState({
            [propertyName]: event.target.value
        })
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
                <h4>Currently Reading: {this.props.user.currently_reading} </h4>
                <h4>Favorite Author: {this.props.user.favorite_author}</h4>
                <h4>Favorite Book: {this.props.user.favorite_book}</h4>
                <h4>Favorite quote: <i>"{this.props.user.favorite_quote}"</i></h4></> :
                <>
                <h2>edit me</h2>
                <img src={this.props.user.profile_image} alt="user profile image" width="150px" className="profileImage" />
                {/* <input type="file" /> */}
                <button id="upload_widget" className="cloudinary-button" onClick={this.handleWidget} >Upload New Picture</button>
                
                <TextField onChange={(event) => this.handleInputs('currently_reading', event)} placeholder="Currently reading..." 
                            label="Currently reading" defaultValue={this.props.user.currently_reading} />
                <TextField onChange={(event) => this.handleInputs('favorite_author', event)} placeholder="Favorite author..." 
                            label="Favorite author" defaultValue={this.props.user.favorite_author} />
                <TextField onChange={(event) => this.handleInputs('favorite_book', event)} placeholder="Favorite book..." 
                            label="Favorite book" defaultValue={this.props.user.favorite_book} />
                <TextField onChange={(event) => this.handleInputs('favorite_quote', event)} placeholder="Favorite quote..." 
                            label="Favorite quote" defaultValue={this.props.user.favorite_quote}/><br/>
                <Button onClick={this.handleEdit}>Done</Button><br/>
                </>
                }
       
                {/* {JSON.stringify(this.props.user.profile_image)}
                {JSON.stringify(this.props.user)} */}
                {/* {JSON.stringify(this.state)} */}
               
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