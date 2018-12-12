import React, { Component } from "react";
import {BrowserRouter as Router, Route, Redirect, Link, NavLink} from "react-router-dom";
import firebase from "firebase";
import "./App.css";
import Search from "./Search";
import Dashboard from "./Dashboard";
import DailyTip from "./DailyTip";
import Footer from './Footer'

import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'

library.add(faUserCircle)


const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
    }
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        }
        ,() => {
           this.dbRef = firebase.database().ref(`/${this.state.user.uid}`) //this creates a refernce specific to the user 
           this.dbRef.on('value', (snapshot) => {
             this.setState({
               userGoals: snapshot.val() || {}
             })
           })
        });
      }

    });
  }
 


  logIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      this.setState(
        {
        user: result.user,
      });
    });
  };

  logOut = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  anonLogIn = () => {
    auth.signInAnonymously().then((result) => {
      this.setState({
        user: result.user
      })
    })
  }

  render() {
    return (
    <Router>
    <div className="App">
      <header>
        <div className="headerContainer wrapper">
        <h1>Garbage Sorter</h1>

        {/* {!this.state.user && <Redirect to="/" />} */}

        <div className="headerUser">
          <div className="buttons"> 
          {this.state.user ? 
          <button id="signOut" onClick={this.logOut}>Sign Out</button>
          :
          <> <button id="signIn" onClick={this.logIn}>Sign In</button>
          <button id="signInGuest" onClick={this.anonLogIn}>Sign In as Guest</button> </>
          }
          </div>
          
          <div className="userImage">
            {this.state.user
              ?
              <img className="profilePic"
                src={this.state.user.photoURL || require('./assets/personicon.png')}
                height="50" alt="Google profile of user" />
              :
              null
            }
          </div>

        </div>
      </div>
      </header>

        <div className="routerDaddy">

          <Route exact
          path="/"
          render=
          {(props) =>
          <Search
        user={this.state.user}
        />}
      />


          <Route
            path="/dashboard"
            render=
            {(props) => 
              this.state.user ?
            <Dashboard
            user={this.state.user}
            />
          : 
        <Redirect to="/"/>
      }
          />
        </div>
        <div className="dailyTip">
          <DailyTip />
        </div>
      <Footer />
      </div>
    </Router>
    
      
  
  );
}
}

export default App;
