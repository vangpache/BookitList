import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

class Notifications extends Component {

    state = {
        invite_accepted: false
    }

    handleAccept = (id) => {
        this.setState({
            invite_accepted: true
        })
        this.props.dispatch({
            type: 'ACCEPT_INVITE',
            payload: this.state,
            clubId: id
        })
    }

    render () {

        return (
            <>
            <h4>Notifications</h4>
            <ul>
                {this.props.notifications.map(invite => (
                    <li>{invite.name}

                        <Button variant="outlined" size="small" 
                                onClick={() => this.handleAccept(invite.clubs_id)} >Accept Invite
                        </Button>

                        <Button variant="outlined" size="small" 
                                onClick={() => this.handleDecline(invite.clubs_id)}>Decline Invite
                        </Button>

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