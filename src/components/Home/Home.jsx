import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Grid, Paper } from '@material-ui/core';



class Home extends Component {
    //ON LOAD: RUN THESE FUNCTIONS TO GET DATA
    componentDidMount() {
        this.getDetails();
       
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
  


    render() {

           

        return (

            <div>
                <Grid container spacing ={3}>

                    <Grid item xs={12}>
                        <p>username and avatar here: align to right</p>
                    </Grid>


                    {this.props.clubDetails.map(club => (
                        <Grid item xs={1.5} >
                            <Paper>
                                <Card onClick={this.handleClick}>
                                    <CardContent >
                                        <CardActions >
                                        <p>{club.name}</p>
                                            <img src={club.image_url} alt={club.book_title}/>
                                        <p>Book: {club.book_title}</p>
                                        <p>By: {club.author}</p>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    ))}

                    
                    <Grid item xs={4.25} >
                        
                        <Paper>
                            <Card>
                                <CardContent>
                                    <h4>Notifications</h4>
                                    <ul>
                                        <li>invites go here
                       
                                                <Button variant="outlined" size="small">Accept Invite</Button>
                                                <Button variant="outlined" size="small">Decline Invite</Button>
                                       
                                        </li>
                                    </ul>
                                      
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

                        <Grid item xs={4.25}>
                            <Paper>
                            <Card>
                                <CardContent>
                                    <h3>Bookit List:</h3>
                                    <ul>
                                        <Link to="/club"><li>Book 1</li></Link>
                                        <li>Book 2</li>
                                        <li>Book 3</li>
                                        <li>Book 4</li>
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