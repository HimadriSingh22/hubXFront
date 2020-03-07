import React,{Component} from 'react';
import {Button} from '@material-ui/core';
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    login=()=>{
        this.props.history.push('/login');

    }
    signup=()=>{
        this.props.history.push('/signup');
    }
    render(){
        return(
            <div>
               <h1>Welcome To Event App</h1>
               <Button onClick={this.login}>Login</Button>
               <Button onClick={this.signup}>Sign Up</Button>
            </div>
        )
    }
}