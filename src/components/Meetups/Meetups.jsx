import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';


class Meetups extends Component {
    state = {
        date: '',
        start_time: '',
        end_time: '',
        location: '',
        notes: '',
        clubId: this.props.match.params.id,
        meetup: false
    }

    //TOGGLES THE ADD A NEW MEETUP DATE/TIME/LOCATION INPUTS
    handleMeetup = () => {
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
            [propertyName]: event.target.value
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

            <div>
                <h3>Upcoming Meets:</h3>
                <ul>
                    <li>Monday Nov. 4th, 2019 @ GroundsWell Cafe</li>
                    <li>Friday Nov. 8th, 2019 @ 980 Fuller Avenue, Saint Paul, MN 55104</li>
                </ul>
                {!this.state.meetup ?
                    < Button variant="outlined" onClick={this.handleMeetup} >Add new meetup</Button> :
            <>
                    <TextField variant="outlined" type="date" onChange={(event) => this.handleMeetupInputs('date', event)} /><br />
                    <TextField variant="outlined" type="time" onChange={(event) => this.handleMeetupInputs('start_time', event)} />
                    <TextField variant="outlined" type="time" onChange={(event) => this.handleMeetupInputs('end_time', event)} /><br />
                    <TextField multiline rows="3" variant="outlined" type="text" placeholder="location" onChange={(event) => this.handleMeetupInputs('location', event)} />
                    <TextField multiline rows="3" variant="outlined" type="text" placeholder="notes..." onChange={(event) => this.handleMeetupInputs('notes', event)} /><br/>
                    <Button variant="outlined" onClick={this.handleAddMeetup} >Add</Button><Button variant="outlined" onClick={this.handleMeetup}>Cancel</Button>
                    
                    </> }
                {JSON.stringify(this.state)}
                
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(Meetups);