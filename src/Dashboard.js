import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import './App.css';
import firebase from "./firebase";
import Responsivepie from "./ResponsivePie";
import Responsiveline from "./ResponsiveLine";
import swal from 'sweetalert';


const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineGraph: null,
      user: this.props.user,
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0
    }
  }

  componentDidUpdate(prevProp, prevState){
    console.log("PREVPROP", prevProp)
    console.log("prevstate", prevState)
  }

  componentDidMount() {
    this.arrayOfEight();
    //sets state using the CURRENT firebase
    const dbRef = firebase.database().ref(`/${this.props.user.uid}/current`);
    let firebaseState;
    //making sure state is set to 0 and not undefined on a promise
    dbRef.on('value', (snapshot) => {
      let firebaseState = snapshot.val() || {}
      this.setState({
        garbageBags: firebaseState.garbageBags,
        greenBags: firebaseState.greenBags,
        blueBags: firebaseState.blueBags
      });
    });
  }

  //function that creates an ARRAY of 8 most recent items in PAST node to pass to State
  arrayOfEight = () => {
    const dbRefpast = firebase.database().ref(`/${this.props.user.uid}/past`);
    //sets up a fall-back incase PAST node is empty
    let empty =
      [
        {
          greenBags: 0,
          garbageBags: 0,
          blueBags: 0
        },
        {
          greenBags: 0,
          garbageBags: 0,
          blueBags: 0
        },
        {
          greenBags: 0,
          garbageBags: 0,
          blueBags: 0
        },
        {
          greenBags: 0,
          garbageBags: 0,
          blueBags: 0
        },
        {
          greenBags: 0,
          garbageBags: 0,
          blueBags: 0
        },
        {
          greenBags: 0,
          garbageBags: 0,
          blueBags: 0
        },
        {
          greenBags: 0,
          garbageBags: 0,
          blueBags: 0
        },
        {
          greenBags: 0,
          garbageBags: 0,
          blueBags: 0
        }
      ]
    dbRefpast.once('value', (snapshot) => {
      if (!snapshot.exists()) {
        dbRefpast.update(empty)
      }
      //ERRORS OUT BECAUSE SNAPSHOT DOESNOT EXIST PUT IN .then?
    }).then((snapshot) => {
      //create variable of the snapshot of PAST node and set it as State
      const firebaseStatePast = snapshot.val();
      let newFirebase = firebaseStatePast.slice(-8)
      this.setState({
        lineGraph: newFirebase
      })
    })
  };



  //function that adds a bag to CURRENT node in firebase
  addBag = (e) => {
    e.preventDefault();
    //created a database called CURRENT unique to each user
    const dbRef = firebase.database().ref(`/${this.props.user.uid}/current`);

    let userClick = firebase.database().ref(e.target.id)
    let bagValue = Number(e.target.value) + 1

    // sets state
    this.setState({
      [e.target.id]: bagValue
    })
    //updates current Firebase branch
    dbRef.update({
      [e.target.id]: bagValue
    })
  }


  saveWeek = () => {
    const dbRefPast = firebase.database().ref(`/${this.props.user.uid}/past`);

    const dbRefCurrent = firebase.database().ref(`/${this.props.user.uid}/current`);

    // variable that grabs present state
    let pastWeek = {
      greenBags: this.state.greenBags,
      garbageBags: this.state.garbageBags,
      blueBags: this.state.blueBags
    }
    //variable that resets CURRENT to empty
    let newWeek = {
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0
    }

    this.setState({
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0
    })

    //try to return the array inside of PAST node of firebase and then .push new object into it and then .update().firebase
    let firebaseArray;
    dbRefPast.once('value', (snapshot) => {
      firebaseArray = snapshot.val();
      console.log("in the .then of saveWeek")
      // console.log(firebaseArray)
    }).then(() => {
  
      console.log("before", firebaseArray)
      firebaseArray.push(pastWeek)
      dbRefPast.update(firebaseArray)
      dbRefCurrent.update(newWeek)
      this.arrayOfEight()
    });
  }

  //function that saves week on submit and adds it to PAST node
  onSubmitDashboard = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "submit garbage stats",
      buttons: true,
    }).then((submit) => {
      // const deRefpast=  databaseReference.child("Users").child(user.getUid()).setValue(userInformations);
      if (submit) {
        this.saveWeek()
      } else {
        //
      }
    })
  }

  render() {
    return (
      <div className="dashboard">
        {
          this.props.user ? (
            <main>
              <h4>{this.props.user ? `Welcome to your dashboard ${this.props.user.displayName}!` : null} </h4>

              <form className="goalsForm" onSubmit={this.onSubmitDashboard}>

                <label htmlFor="">Number of Garbage Bags</label>
                <button
                  id="garbageBags"
                  data-bag={this.state.garbageBags}
                  type="number"
                  value={this.state.garbageBags}
                  onClick={this.addBag} >
                  GARBAGE {this.state.garbageBags}</button>

                <label>Number of compost bags: </label>
                <button
                  id="greenBags"
                  data-bag={this.state.greenBags}
                  type="number"
                  value={this.state.greenBags}
                  onClick={this.addBag} >
                  GREENBIN {this.state.greenBags}</button>


                <label>Number of recycling bags:</label>
                <button
                  id="blueBags"
                  data-bag={this.state.blueBags}
                  type="number"
                  value={this.state.blueBags}
                  onClick={this.addBag} >
                  BLUE BIN {this.state.blueBags}</button>

                <input type="submit" />
              </form>

              <div className="weeklyPie">
                <Responsivepie
                  garbageBags={this.state.garbageBags}
                  greenBags={this.state.greenBags}
                  blueBags={this.state.blueBags}
                />
              </div>
              <Responsiveline lineGraph={this.state.lineGraph}/>


            </main>
          )
            : (
              <h4>You must be logged in to see this page</h4>
            )
        }
      </div>
    )
  }



}

export default Dashboard