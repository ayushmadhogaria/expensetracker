import React, {Component} from 'react';
import './Main.css';
import Login from './Forms/Login';
import Register from './Forms/Register';
import fire from '../config/Fire';
import Tracker from './Tracker/Tracker';

export default class Main extends Component{
    
    state={
        user:1,
        loading:true
    }
    componentDidMount(){
        this.authListener();
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({user});
            }else{
                this.setState({user:null});
            }
        });
    }

    formSwitcher = (action) =>{
        this.setState({
            formSwitcher: action === 'register' ? true: false
        });
    }

    render(){
        const form= !this.state.formSwitcher? <Login/>:<Register/>;
        if (this.state.user === 1){
            return (
              <div className="mainBlock">
              </div>);
        }
        return(
            <>
            {!this.state.user ? (
            <div className="mainBlock">
                <h3>Expense Tracker System</h3>
                {form}
                {!this.state.formSwitcher ?
                (<span className="createacc">
                    Not Registered yet?
                    <button onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register':'login')}
                    className="regbutton">Click here to register.</button>
                </span>):(
                <span className="creacc">
                Account already exists?
                <button onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register':'login')}
                className="regbutton">Login from here.</button>
            </span>)}
            </div>
            ):(<Tracker/>)}
            </>
        );
    }
}
        