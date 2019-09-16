import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from '../Notifications/Notifications';
import { Link, withRouter } from 'react-router-dom';
import { Button, Card, CardContent, Grid, Paper } from '@material-ui/core';



class Home extends Component {
    //ON LOAD: RUN THESE FUNCTIONS TO GET DATA
    componentDidMount() {
        this.getDetails();
        this.getNotifications();
       
    }

  


    //GETS THE DETAILS FOR MOST RECENT THREE CLUBS
    getDetails = () => {
        this.props.dispatch({
            type: 'GET_CLUB_DETAILS'
        })
    }

    handleClick = () => {
        console.log('book clicked');
    }

    getNotifications = () => {
        this.props.dispatch({
            type: 'GET_NOTIFICATIONS'
        })
    }


    // handleDelete = (id) =>{
    //     console.log('delete button clicked');  
    //     this.props.dispatch({
    //         type: 'DELETE_CLUB',
    //         payload: id
    //     })
    // }

    handleLeave = (id) => {
        console.log('leave button clicked:', id);
        this.props.dispatch({
            type: 'LEAVE_BOOK',
            payload: id,
            history: this.props.history
        })
    }
  


    render() {

           

        return (

            <div>
                <Grid container spacing ={3}>

                    <Grid item xs={12}>
                        <p>username and avatar here: align to right</p>
                    </Grid>


                    {this.props.clubDetails.map(club => (
                        <Grid item xs={3} >
                            <Paper>
                                <Card onClick={this.handleClick}>
                                    <CardContent >
                                        {/* <CardActions > */}
                                        <p>{club.name}</p>
                                            <img src={club.image_url} alt={club.book_title}/>
                                        <p>Book: {club.book_title}</p>
                                        <p>By: {club.author}</p>
                                        {/* </CardActions> */}
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    ))}

                    
                    <Grid item xs={3} >
                        
                        <Paper>
                            <Card>
                                <CardContent>
                                    <Notifications /> 
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

                        <Grid item xs={3}>
                            <Paper>
                            <Card>
                                <CardContent>
                                    <h3>Bookit List:</h3>
                                    <ul>
                                    {this.props.clubDetails.map(club => (
                                        <>
                                        <Link to={`/club/${club.clubs_id}`} ><li >{club.name}</li></Link>
                                            {club.admin_status ? <Button key={club.clubs_id} >Delete</Button> : 
                                            <Button key={club.clubs_id} onClick={() => this.handleLeave(club.clubs_id)}>Leave Club</Button>}
                                        </>
                                    ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </Paper>
                        
                    </Grid>
                    </Grid>
               
                    {/* {JSON.stringify(this.props.clubDetails)} */}
                    {JSON.stringify(this.props.notifications)}
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        clubDetails: reduxStore.databaseReducer,
    }
}

export default withRouter (connect(mapStateToProps) (Home));