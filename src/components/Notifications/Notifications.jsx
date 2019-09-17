import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

class Notifications extends Component {


    handleAccept = (id) => {
        this.props.dispatch({
            type: 'ACCEPT_INVITE',
            payload: id,
        })
    }

    handleDecline = (id) => {
        this.props.dispatch({
            type: 'DELETE_INVITE',
            payload: id
        })
    }

    render () {

        console.log('in notifications, club id is:', this.props.notifications.id);
        

        return (
            <>
            <h4>Notifications</h4>
            <ul>
                {this.props.notifications.map(invite => (
                    <li>{invite.name}

                        <Button variant="outlined" size="small" 
                                onClick={() => this.handleAccept(invite.clubs_id)}>Accept Invite
                        </Button>

                        <Button variant="outlined" size="small" 
                                onClick={() => this.handleDecline(invite.clubs_id)}>Decline Invite
                        </Button>
                        {/* {JSON.stringify(invite.clubs_id)} */}
                    </li>
                ))}

            </ul>
            </>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        notifications: reduxStore.notificationsReducer
    }
}

export default connect(mapStateToProps) (Notifications);