import React, { Component } from 'react';
import { Button, Card, CardActions, CardContent, Grid,Paper } from '@material-ui/core';



class Home extends Component {


    render() {


        return (

            <div>
                <Grid container spacing ={3}>

                    <Grid item xs={12}>
                        <p>username and avatar here: align to right</p>
                    </Grid>

                    <Grid item xs={2} >
                        <Paper>
                            <Card>
                                <CardContent>
                                    <p>list 1</p>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item xs={2} >
                        <Paper>
                            <Card>
                                <CardContent>
                                    <p>list 2</p>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item xs={2} >
                        <Paper>
                            <Card>
                                <CardContent>
                                    <p>list 3</p>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

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

export default Home;