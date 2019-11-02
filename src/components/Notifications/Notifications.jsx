import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton, InputBase, Paper, Table, TableBody, TableCell, TableRow  } from '@material-ui/core';
import { MailOutline, Cancel, CheckCircle } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import Book from '@material-ui/icons/Book';
import { withStyles } from '@material-ui/styles';

const styles = {
    iconbuttonAccept: {
        margin: '15px',
        fontSize: '1em',
        color: 'green',
        background: 'white',
        // backgroundColor: '#ffd600'
    },
    iconbuttonDecline: {
        margin: '15px',
        fontSize: '1em',
        color: 'red',
        // backgroundColor: '#ffd600'
    },
    // notification: {
    //     backgroundColor: '#ffd600',
    //     padding: '0px'
    // },

}

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
            <div className="notifications">
                <div>
                <h4>Notifications <MailOutline /></h4>
                <Table size="small">
                        <TableBody>
                        {this.props.notifications.map(invite => (
                            <TableRow>
                                <TableCell className={this.props.classes.notification}  >
                                    <span>You're invited to: </span>
                                    {invite.name}
                                </TableCell>
                                <TableCell className={this.props.classes.notification} >
                                    <IconButton className={this.props.classes.iconbuttonAccept} variant="outlined" size="small"
                                        onClick={() => this.handleAccept(invite.clubs_id)}>
                                        <CheckCircle /> Accept Invite
                        </IconButton>
                                </TableCell>
                                <TableCell className={this.props.classes.notification} >
                                    <IconButton className={this.props.classes.iconbuttonDecline} variant="outlined" size="small"
                                        onClick={() => this.handleDecline(invite.clubs_id)}>
                                        <Cancel />Decline Invite
                        </IconButton>
                                </TableCell>
                            </TableRow>
                ))}
                    </TableBody>
                </Table>
                </div>
                {/* {JSON.stringify(this.props.notifications)} */}
                <div className="searchBooksInput">
                <Paper>
                    <Book />
                    <InputBase placeholder="search books..."/>
                        <IconButton onClick={this.handleClick}>
                            <SearchIcon />
                        </IconButton>
                </Paper>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        notifications: reduxStore.notificationsReducer
    }
}

export default withStyles (styles) (connect(mapStateToProps) (Notifications));