import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardContent, Grid } from '@material-ui/core';
import { PersonOutline } from '@material-ui/icons';
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
        margin: '15px'
    },
    p: {
        color: 'orange'
    },
    ul: {
        listStyleType: 'none'
    }
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
        this.props.dispatch({
            type: 'LEAVE_BOOK',
            payload: id,
            history: this.props.history
        })
    }

    handleEdit = (id) => {
        console.log('handleEdit club id is: ', id);
        this.props.history.push(`/edit/${id.id}`)

    }

    render() {


        return (

            <div>
                <Grid item xs={7} className={this.props.classes.gridBookDetails} >
                 
                            <CardContent> 
                                <h4>Book: {this.props.details.book_title} </h4>
                                <h5>Author: {this.props.details.author} </h5>
                                <img src={this.props.details.image_url} alt="book cover"/>
                                <p>Notes: {this.props.details.description}</p>
                                

                        {this.props.details.admin_status ?
                            <Button variant="outlined" onClick={() => this.handleEdit(this.props.match.params)}>Edit</Button> :
                            <Button onClick={() => this.handleLeave(this.props.match.params.id)}
                            className={this.props.classes.button}>Leave Club</Button>}
                            </CardContent>
                      
                </Grid>

                <Grid item xs={5} className={this.props.classes.gridMembers}>
                            <CardContent>
                                <p className={this.props.classes.p} >current members</p>
                                <ul className={this.props.classes.ul} >
                            {this.props.members.map(username => (
                                    <li> <PersonOutline /> {username.username}</li>
                                ))}
                                </ul>
                                
              
                            </CardContent>
                </Grid>
                        
               
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