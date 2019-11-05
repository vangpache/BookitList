import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardContent, TextField } from '@material-ui/core';
import Moment from 'react-moment';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';


const styles = {
    meetupDetails: {
        backgroundColor: '#e8e8e8',
        width: '300px',
        height: '500px'
    },
    meetupList: {
        backgroundColor: 'white',
        height: '100px',
        overflowY: 'scroll',
        paddingTop: '0px',
        borderRadius: '3px',
    },
    meetupForm: {
        paddingTop: '10px',
        maxWidth: '250px',
    },
    buttons: {
        margin: '5px',
        backgroundColor: 'white',
    }
}

class Meetups extends Component {
    componentDidMount() {
        this.getMeetups();
    }
    
    state = {
        date: '',
        start_time: '',
        end_time: '',
        location: '',
        notes: '',
        clubId: '',
        meetup: false,
    }

    getMeetups = () => {
        this.props.dispatch({
            type: 'GET_MEETUPS',
            payload: +(this.props.clubId.id)
        })
    }

    handleMoreInfo = (event) => {
        event.currentTarget.classList.toggle('active');
    }

    //TOGGLES THE ADD A NEW MEETUP DATE/TIME/LOCATION INPUTS
    handleMeetup = (id) => {
        if (!this.state.meetup) {
            this.setState({
                meetup: true
            })
        } else {
            this.setState({
                meetup: false
            })
        }  
    }

    //SET STATE WITH INPUT VALUES FOR MEETUP
    handleMeetupInputs =(propertyName, event) => {
        this.setState({
            [propertyName]: event.target.value,
            clubId: this.props.club.id
        })
    }

    //DISPATCH STATE TO SAGA AND SERVER
    handleAddMeetup = () => {
        this.props.dispatch({
            type: 'POST_MEETUP',
            payload: this.state
        })
        //ADD CLEAR INPUT FIELDS  AND SET MEETUP TO FALSE
        this.setState({
            date: '',
            start_time: '',
            end_time: '',
            location: '',
            notes: '',
            meetup: false,
        })
    }


    render() {



        return (

            <CardContent className={this.props.classes.meetupDetails}>
                <h4>Next meetup:</h4>
                <CardContent className={this.props.classes.meetupList} >

                {this.props.meetups.map((meetup, i) => {
                    return (
                        <>
                        <ul>
                            <li>
                                <Moment format="dddd, MMMM Do YYYY">{meetup.date}</Moment> @ {moment(meetup.start_time, "hh:mm").format('LT')}  to {moment(meetup.end_time, "hh:mm").format('LT')}
                                     <div key={i} className="buttonLink" onClick={this.handleMoreInfo}>more info...
                                     <div className="lessInfo">
                                        <p>location: {meetup.location}</p>
                                        <p>notes: {meetup.notes}</p>
                                     </div>
                                     </div>
                                
                            </li>
                        </ul>
                         
                        </>
                    )
                })}
                </CardContent>
    
                {!this.state.meetup ?
                    < Button className={this.props.classes.buttons} variant="outlined" onClick={this.handleMeetup} >Add new meetup</Button> :
            <div className={this.props.classes.meetupForm}>
                    <TextField value={this.state.date} variant="outlined" type="date" onChange={(event) => this.handleMeetupInputs('date', event)} /><br />
                    <TextField value={this.state.start_time} variant="outlined" type="time" onChange={(event) => this.handleMeetupInputs('start_time', event)} />
                    <TextField value={this.state.end_time} variant="outlined" type="time" onChange={(event) => this.handleMeetupInputs('end_time', event)} /><br />
                    <TextField value={this.state.location} multiline rows="3" variant="outlined" type="text" placeholder="location" onChange={(event) => this.handleMeetupInputs('location', event)} />
                    <TextField value={this.state.notes} multiline rows="3" variant="outlined" type="text" placeholder="notes..." onChange={(event) => this.handleMeetupInputs('notes', event)} /><br/>
                        <Button className={this.props.classes.buttons} variant="outlined" onClick={this.handleAddMeetup} >Add</Button>
                        <Button className={this.props.classes.buttons} variant="outlined" onClick={this.handleMeetup}>Cancel</Button>
                    
                    </div> }<br/>
                {/* {JSON.stringify(this.props.meetups)} */}
                {/* {JSON.stringify(this.state)} */}
                
            </CardContent>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        club: reduxStore.singleBookReducer,
        meetups: reduxStore.meetupsReducer,
    }
}

export default withStyles(styles) (connect(mapStateToProps)(Meetups));