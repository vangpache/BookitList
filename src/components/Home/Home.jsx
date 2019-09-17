import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from '../Notifications/Notifications';
import AllClubsDisplay from '../AllClubsDisplay/AllClubsDisplay';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Button, Card, CardContent, Divider, Grid, Paper } from '@material-ui/core';

const styles = {
    
}


class Home extends Component {
    //ON LOAD: RUN THESE FUNCTIONS TO GET DATA
    componentDidMount() {
        this.getDetails();
        this.getNotifications();
    }

    //GETS THE DETAILS FOR ALL CLUBS TO DISPLAY ON HOME PAGE ON LOAD
    getDetails = () => {
        this.props.dispatch({
            type: 'GET_CLUB_DETAILS'
        })
    }

    //GETS INVITES TO DISPLAY ON HOME PAGE ON RENDER
    getNotifications = () => {
        this.props.dispatch({
            type: 'GET_NOTIFICATIONS'
        })
    }
  

    render() {


        return (

            <div>
                <Grid container spacing ={3}>
                    <Grid item xs={6} >

                        {/* <Paper> */}
                            {/* <Card>
                                <CardContent> */}
                                    <Notifications />
                                {/* </CardContent>
                            </Card> */}
                        {/* </Paper> */}
                    </Grid>
                    {/* <Divider orientation="vertical" variant="middle" /> */}
                    <Grid item xs={6}>
                        <p>username and avatar here: align to right</p>
                    </Grid>
               
                    <Grid item xs={12}>
                        <AllClubsDisplay />
                    </Grid>
                        
                    </Grid>
               
                    {JSON.stringify(this.props.clubDetails)}
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        clubDetails: reduxStore.databaseReducer,
    }
}

export default withRouter (withStyles(styles)((connect(mapStateToProps) (Home))));