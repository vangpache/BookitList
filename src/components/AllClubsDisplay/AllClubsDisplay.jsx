import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react';
import { Button, Card, CardContent, IconButton } from '@material-ui/core';
import  DeleteIcon from '@material-ui/icons/Delete';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles = {
    card: {
        width: 300,
        height: 375,
        display: 'inline-block',
        flexDirection: 'rows',
        margin: '5px',
        fontSize: '14px'
    },

}


class AllClubsDisplay extends Component {

    //LEAVE A CLUB AS A NON-ADMIN; DELETES CLUB FROM USER_CLUBS TABLE
    handleLeave = (id) => {
        console.log('leave button clicked:', id);
        swal({
            title: "Are you sure you want to leave?",
            text: "Once you leave, you will not be able to see this circle anymore.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if(willDelete) {
                swal("Poof! You've left the circle!", {
                    icon: "success",
                })
                this.props.dispatch({
                    type: 'LEAVE_BOOK',
                    payload: id,
                    history: this.props.history
                })
            } 
        })
    }

    //DELETE A CLUB FROM HOME PAGE AS AN ADMIN
    handleDelete = (id) => {
        swal({
            title: "Are you sure you want to delete this circle?",
            text: "Once you delete a circle, it will be gone forever!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if(willDelete) {
                swal("Poof! Deleted!", {
                    icon: "success",
                })
                this.props.dispatch({
                    type: 'DELETE_CLUB',
                    payload: id
                })
            }
        })
    }

    render() {

        return(
            <>
                {this.props.clubDetails.map(club => (

                            <Card className={this.props.classes.card}
                                    key={club.clubs_id} onClick={this.handleClick}>
                                <CardContent >

                                    <p>{club.name}</p>
                                    <Link to={`/club/${club.clubs_id}`}>
                                        <img src={club.image_url} alt={club.book_title} />
                                    </Link>
                                    <p>Book: {club.book_title}</p>
                                    <p>By: {club.author}</p>
                            {club.admin_status ? <IconButton aria-label="Delete" key={club.clubs_id} onClick={() => this.handleDelete(club.clubs_id)}>
                                                    <DeleteIcon   />
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