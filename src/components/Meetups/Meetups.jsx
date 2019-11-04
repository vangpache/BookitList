import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardContent, TextField } from '@material-ui/core';
import Moment from 'react-moment';
import moment from 'moment';


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
        moreInfo: false,
    }

    getMeetups = () => {
        this.props.dispatch({
            type: 'GET_MEETUPS',
            payload: +(this.props.clubId.id)
        })
    }

    handleMoreInfo = (event) => {
        // if(!this.state.moreInfo) {
        //     this.setState({
        //         moreInfo: true
        //     })
        // } else {
        //     this.setState({
        //         moreInfo: false
        //     })
        // }
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
    }


    render() {



        return (

            <CardContent>
                <h3>Next meetup:</h3>

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
    
                {!this.state.meetup ?
                    < Button variant="outlined" onClick={this.handleMeetup} >Add new meetup</Button> :
            <>
                    <TextField variant="outlined" type="date" onChange={(event) => this.handleMeetupInputs('date', event)} /><br />
                    <TextField variant="outlined" type="time" onChange={(event) => this.handleMeetupInputs('start_time', event)} />
                    <TextField variant="outlined" type="time" onChange={(event) => this.handleMeetupInputs('end_time', event)} /><br />
                    <TextField multiline rows="3" variant="outlined" type="text" placeholder="location" onChange={(event) => this.handleMeetupInputs('location', event)} />
                    <TextField multiline rows="3" variant="outlined" type="text" placeholder="notes..." onChange={(event) => this.handleMeetupInputs('notes', event)} /><br/>
                    <Button variant="outlined" onClick={this.handleAddMeetup} >Add</Button><Button variant="outlined" onClick={this.handleMeetup}>Cancel</Button>
                    
                    </> }<br/>
                {/* {JSON.stringify(this.props.meetups)} */}
                
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

export default connect(mapStateToProps)(Meetups);