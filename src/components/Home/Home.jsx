import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardActions, CardContent, Grid,Paper } from '@material-ui/core';



class Home extends Component {

    componentDidMount() {
        this.getDetails();
    }

    getDetails = () => {
        this.props.dispatch({
            type: 'GET_CLUB_DETAILS'
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
                        <Grid item xs={2} >
                            <Paper>
                                <Card>
                                    <CardContent>
                                        <p>{club.name}</p>
                                        <p>Book: {club.book_title}</p>
                                        <p>By: {club.author}</p>
                                        <img src={club.image_url} alt={club.book_title} />
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    ))}


                    <Grid item xs={6} >
                        <Paper>
                            <Card>
                                <CardContent>
                                    <h4>Notifications</h4>
                                    <ul>
                                        <li>invites go here
                                            <CardActions>
                                                <Button variant="outlined" size="small">Accept Invite</Button>
                                                <Button variant="outlined" size="small">Decline Invite</Button>
                                            </CardActions>  
                                        </li>
                                    </ul>
                                      
                                </CardContent>
                            </Card>
                        </Paper>

                    </Grid>

                </Grid>

            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        clubDetails: reduxStore.databaseReducer
    }
}

export default connect(mapStateToProps) (Home);