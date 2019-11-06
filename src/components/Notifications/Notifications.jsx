import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridList, GridListTile, GridListTileBar, IconButton, Table, TableBody, TableCell, TableRow  } from '@material-ui/core';
import { MailOutline, Cancel, CheckCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import CreateNewSearchBar from '../CreateNewSearchBar/CreateNewSearchBar';


const styles = {
    iconbuttonAccept: {
        margin: '15px',
        fontSize: '1em',
        color: 'green',
        background: 'white',
    },
    iconbuttonDecline: {
        margin: '15px',
        fontSize: '1em',
        color: 'red',
    },
    bookCover: {
        width: '120px'
    },
    bookDetails: {
        display: 'inline-block',
        padding: '5px',
        verticalAlign: 'top',
        maxWidth: '200px'
        
    },
    gridListDiv: {
        width: '400px',
        backgroundColor: '#e8e8e8',
        maxHeight: '300px',
        overflowY: 'scroll',
        borderRadius: '5px'
    }
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
                    <CreateNewSearchBar />
                    <div className={this.props.classes.gridListDiv} >
                    <GridList className={this.props.classes.gridList} cols={1} rows={1}>
                        {this.props.booksList.map(tile => (
                            <>
                            <GridListTile key={tile} onClick={() => this.handleClick(tile)} >
                                <div className={this.props.classes.bookDetails} >
                                <img className={this.props.classes.bookCover} src={tile.best_book.image_url._text} alt={tile.best_book.title._text} />
                                </div>
                                <div className={this.props.classes.bookDetails}>
                                    <p> {tile.best_book.title._text}</p>
                                    <p> by: {tile.best_book.author.name._text}</p>
                                </div>
                            </GridListTile>
                            </>
                        ))}
                    </GridList>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        notifications: reduxStore.notificationsReducer,
        booksList: reduxStore.booksReducer,
    }
}

export default withStyles (styles) (connect(mapStateToProps) (Notifications));