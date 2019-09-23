import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notifications from '../Notifications/Notifications';
import AllClubsDisplay from '../AllClubsDisplay/AllClubsDisplay';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const styles = {
    notificationsGrid: {
        // background: '#cddc39',
        // height: 200,
    }
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
                    <Grid item xs={6} className={this.props.classes.notificationsGrid} >
                                    <Notifications />
                    </Grid>
              
                    <Grid item xs={6}>
                        {/* <p>username and avatar here: align to right</p> */}
                    </Grid>
               
                    <Grid item xs={12}>
                        <h1>My Current List:</h1>
                        <AllClubsDisplay />
                    </Grid>
                        
                </Grid>
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