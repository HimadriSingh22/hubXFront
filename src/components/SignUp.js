import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import {TextField,Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Password} from '@material-ui/icons';
import {signUpValidation} from './validation';
import axios from 'axios';
import history from '../history';
const styles = theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      minWidth: "1000px", // Fix IE 11 issue.
      marginTop: theme.spacing(4)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    password: {
      backgroundColor: "#E8F0FE"
    }
  });
  
class SignUp extends Component {
    constructor(){
        super();
        this.state={
            firstName:"",
           userName:"",
            password:"",
            validationErrors:""
        }
    }
onChangeHandler=(e)=>{
    this.setState({[e.target.name]:e.target.value,validationErrors:""});
    console.log("WWWWWWWWWww On chnage hanlder");
}

signUpHandler=()=>{
    var newUser ={
        firstName:this.state.firstName,
        userName:this.state.userName,
        password:this.state.password
    }
var valid = signUpValidation(newUser);
console.log(valid);
if(valid.formIsValid){
  alert("sign up api!");
    axios.post('http://localhost:8080/signUp',newUser).then(res=>{
        console.log("sign up response:",res);
        if(res){
            if(res.data.status==="User Exists"){
                alert("User already exists with this email/mobile!");
            }
            if(res.data.status==="Registered"){
                this.props.history.push('/eventDashboard');
            }

        }
 })
}
else{
    this.setState({validationErrors:valid.errors});
}
}
    render(){
        return(
            <div style={{marginTop:"300px"}}>
                <h2>Hello, Welcome to My Event App!</h2>
                <form className={styles.form}>
                <FormControl  className={styles.form}>
               
            <InputLabel htmlFor="userName">User ID</InputLabel>
        <Input
          id="userName"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          name="userName"
          value={this.state.userName}
          onChange={this.onChangeHandler}
        /> <span style={{ color: "red" }}>
        {this.state.validationErrors["userName"]}
      </span>
      <TextField
        
        id="firstName"
        label="Name"
        
        value={this.state.firstName}
        onChange={this.onChangeHandler}
        name="firstName"
      /><span style={{ color: "red" }}>
      {this.state.validationErrors["firstName"]}
    </span>
      <TextField
        //className={classes.margin}
        id="password"
        label="Password"
        
        value={this.state.password}
        onChange={this.onChangeHandler}
        name="password"
      /><span style={{ color: "red" }}>
      {this.state.validationErrors["password"]}
    </span>
     
        
            <Button onClick={this.signUpHandler} color="primary">Sign Up</Button>
      </FormControl>
      </form>
            </div>
        )
    }
}
export default withRouter(SignUp);