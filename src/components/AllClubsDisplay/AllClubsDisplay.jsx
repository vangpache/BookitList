import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardContent, IconButton, Grid, Paper } from '@material-ui/core';
import  DeleteIcon from '@material-ui/icons/Delete';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles = {
    card: {
        maxWidth: 375,
        display: 'inline-block',
        flexDirection: 'rows',
        // alignItems: ''
    },

}


class AllClubsDisplay extends Component {

    //LEAVE A CLUB AS A NON-ADMIN; DELETES CLUB FROM USER_CLUBS TABLE
    handleLeave = (id) => {
        console.log('leave button clicked:', id);
        this.props.dispatch({
            type: 'LEAVE_BOOK',
            payload: id,
            history: this.props.history
        })
    }

    //DELETE A CLUB FROM HOME PAGE AS AN ADMIN
    handleDelete = (id) => {
        this.props.dispatch({
            type: 'DELETE_CLUB',
            payload: id
        })
    }

    render() {

        return(
            <>
                {this.props.clubDetails.map(club => (

                            <Card className={this.props.classes.card} onClick={this.handleClick}>
                                <CardContent >

                                    <p>{club.name}</p>
                                    <Link to={`/club/${club.clubs_id}`}>
                                        <img src={club.image_url} alt={club.book_title} />
                                    </Link>
                                    <p>Book: {club.book_title}</p>
                                    <p>By: {club.author}</p>
                            {club.admin_status ? <IconButton aria-label="Delete">
                                                    <DeleteIcon key={club.clubs_id} onClick={() => this.handleDelete(club.clubs_id)} />
                                                </IconButton> :
                                        <Button key={club.clubs_id} onClick={() => this.handleLeave(club.clubs_id)}>Leave Club</Button>}

                                </CardContent>
                            </Card>
                ))}
            </>
        )
    }
}


const mapStateToProps = reduxStore => {
    return {
        clubDetails: reduxStore.databaseReducer,
    }
}

export default withRouter (withStyles(styles) (connect(mapStateToProps) (AllClubsDisplay)));