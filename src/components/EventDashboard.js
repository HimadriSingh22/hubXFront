import React,{Component} from 'react';
import { Button, TextField, Input } from '@material-ui/core';
import axios from 'axios';
import {eventValidation} from './validation';

const styles = theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    
   
    

    submit: {
      margin: theme.spacing(3, 0, 2)
    },
   
  });
class EventDashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            userName:localStorage.getItem('userName'),
    eventTitle:"",
     eventDate:"",
     eventHost:"",
  eventDescription:"",
   eventTime:"",
           
           createEvent:false,
           validationErrors:"",
           eventCreated:false,
           eventList:[]
        }
    }

    componentDidMount(){
        var userName={userName:localStorage.getItem('userName')}
        console.log("USERNAme:",userName);
        axios.post('http://localhost:8080/event/eventList',userName).then(res=>{
            if(res.data.eventList){
            this.setState({eventList:res.data.eventList});}
            else{
                this.setState({eventList:[]});
            }
            
        });
    }
    createEvent=()=>{
this.setState({createEvent:true,eventCreated:false,})
    }
    onChangeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value,validationErrors:""});
    }
    submitEventHandler=(e)=>{
        const eventDetails={
            eventTitle:this.state.eventTitle,
        eventDate:this.state.eventDate,
       eventHost:this.state.eventHost,
       eventDescription:this.state.eventDescription,
       eventTime:this.state.eventTime,
       userName:this.state.userName
        }
        var valid= eventValidation(eventDetails);
        if(valid.formIsValid){
            axios.post('http://localhost:8080/event',eventDetails).then(res=>{
                console.log("event Status:",res);
                if(res){
                if(res.data.status==="Event Successfully Created!"){
                    var userName={userName:this.state.userName}
                    this.setState({eventCreated:true,createEvent:false});
                    axios.post('http://localhost:8080/event/eventList',userName).then(res=>{
                        if(res.data.eventList){
                            this.setState({eventList:res.data.eventList});
                        }
                    })
                }
                }
        })
        }
        else{
            this.setState({validationErrors:valid.error});
        }
    }

    logoutHandler=()=>{
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userName');
        this.props.history.push('/login');
    }

    render(){
        return(
            <div>
               <h1>Welcome To Event Dashboard!</h1>
               <Button variant="contained"  color="primary" onClick={this.createEvent}>Add New Event</Button>
               {this.state.createEvent&&<div >
                   <form  >
                       <h3>Add Event Details</h3>
                       <TextField placeholder="Event Title" name="eventTitle" value={this.state.eventTitle} onChange={this.onChangeHandler}/>
                       <span style={{ color: "red" }}>
                         {this.state.validationErrors["eventTitle"]}
</span><br/>
                       <Input type="date" placeholder="Event Date" name="eventDate" value={this.state.eventDate} onChange={this.onChangeHandler}/>
                       <span style={{ color: "red" }}>
  {this.state.validationErrors["eventDate"]}
</span><br/>
                       <Input type="time" placeholder="Event Time" name="eventTime" value={this.state.eventTime} onChange={this.onChangeHandler}/>
                       <span style={{ color: "red" }}>
  {this.state.validationErrors["eventTime"]}
</span><br/>
                       <TextField placeholder="Event Description" name="eventDescription" value={this.state.eventDescription} onChange={this.onChangeHandler}/>
                       <span style={{ color: "red" }}>
  {this.state.validationErrors["eventDescription"]}
</span><br/>
                       <TextField placeholder="Event Host" name="eventHost" value={this.state.eventHost} onChange={this.onChangeHandler}/>
                       <span style={{ color: "red" }}>
  {this.state.validationErrors["eventHost"]}
</span><br/>
                       
                       <Button onClick={this.submitEventHandler}>Create Event!</Button>
                   </form>
                   </div>}
                   {this.state.eventCreated&&<div>
                       <h3>Event Successfully Created</h3>
                       </div>}

                       {this.state.eventList.length>0?<div>
                           <h5>Previous Events</h5>
                           {this.state.eventList.map(event=>{
                               return<div style={{backgroundColor:"#f0f0f9"}}>
                                   <h4>{event.eventTitle}</h4>
                                   <h4>{event.eventTime}</h4>
                                   <h4>{event.eventDate}</h4>
                           <h4>{event.eventHost||""}</h4>
                           <h4>{event.eventDescription}</h4>
                               </div>
                           })}
                       </div>:<div><h3>No Previous Events</h3></div>
                       }
                       <Button onClick={this.logoutHandler}>Logout</Button>
            </div>
        )
    }
}

export default EventDashboard;