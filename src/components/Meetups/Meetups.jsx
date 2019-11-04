import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';


class Meetups extends Component {
    state = {
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
                    <TextField variant="outlined" type="date" /><br />
                    <TextField variant="outlined" type="time" />
                    <TextField variant="outlined" type="time" /><br />
                    <TextField multiline rows="3" variant="outlined" type="text" placeholder="location" />
                    <TextField multiline rows="3" variant="outlined" type="text" placeholder="notes..." /><br/>
                    <Button>Add</Button><Button onClick={this.handleMeetup}>Cancel</Button>
                    
                    </> }
                
                
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