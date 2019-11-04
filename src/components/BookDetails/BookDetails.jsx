import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react';
import { Button, CardContent, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';


const styles = {
    gridBookDetails: {
        display: 'inline-block',
        float: 'left'
    },
    gridMembers: {
        display: 'inline-block',
        margin: '30px'
    },
    button: {
        margin: '10px'
    },
}

class BookDetails extends Component {

    componentDidMount() {
        this.getMembersToDisplay();
    }

    
    getMembersToDisplay = () => {
        this.props.dispatch({
            type: 'GET_MEMBERS_DISPLAY',
            payload: this.props.match.params
        })
    }

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
                if (willDelete) {
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

    handleEdit = (id) => {
        console.log('handleEdit club id is: ', id);
        this.props.history.push(`/edit/${id.id}`)

    }

    render() {


        return (

            <div>
                {/* <Grid item xs={6} className={this.props.classes.gridBookDetails} > */}
                 
                            <CardContent> 
                                <h4>{this.props.details.book_title} </h4>
                                <h5>by: {this.props.details.author} </h5>
                                <img src={this.props.details.image_url} alt="book cover"/>
                                <p>{this.props.details.description}</p>

                        {this.props.details.admin_status ?
                            <Button variant="outlined" onClick={() => this.handleEdit(this.props.match.params)}>Edit</Button> :
                            <Button variant="outlined" onClick={() => this.handleLeave(this.props.match.params.id)}
                                className={this.props.classes.button}>Leave Club</Button>}

                            </CardContent>    
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        members: reduxStore.membersReducer
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps)(BookDetails)));