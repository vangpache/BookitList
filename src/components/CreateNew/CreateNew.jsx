import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
import CreateNewSearchBar from '../CreateNewSearchBar/CreateNewSearchBar';

class CreateNew extends Component {


    render () {


        return (


            <div>
                <h1>Create a New Book Club:</h1>
                
                    <CreateNewSearchBar />

                <div>
                <TextField variant="filled" type="text" placeholder="Name of cirlce / book title" /><br/><br/>
                <TextField variant="filled" type="text" placeholder="Description" /><br/><br/>
                Notes:<br/>
                <TextField variant="filled" type="text" placeholder="let clubbers know when and where to meet" /><br /><br />
                <Button varian="filled">Cancel</Button>
                <Button variant="filled">Create New</Button>
                </div>
            </div>
        )
    }
}

export default CreateNew;