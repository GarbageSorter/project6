import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom";
import './App.css';
import firebase from "./firebase";
import Search from "./Search";
import Responsivepie from "./ResponsivePie";
import Responsiveline from "./ResponsiveLine";
import swal from 'sweetalert';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineGraph: null,
      user: {},
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0,
      showPie: true
    }
  }

  componentDidMount(){
    if (this.props.user !== null) {
      this.currentFunction()
      this.arrayOfEight()
    }
  }


  componentDidUpdate(prevProp){
      if (this.props.user !== prevProp.user && this.props.user !== null) {
        this.arrayOfEight()
        this.currentFunction()
      }
  }
  
  currentFunction = () => {
    //if the prop if different than the previous prop, then only updat state. 
    // this.arrayOfEight();
    //sets state using the CURRENT firebase
    const dbRef = firebase.database().ref(`/${this.props.user.uid}/current`);
    let firebaseState;
    //making sure state is set to 0 and not undefined on a promise
    dbRef.on('value', (snapshot) => {
      let firebaseState = snapshot.val() || 
      {garbageBags: 0,
        greenBags: 0,
        blueBags: 0}
      this.setState({
        garbageBags: firebaseState.garbageBags,
        greenBags: firebaseState.greenBags,
        blueBags: firebaseState.blueBags
      })
    });
  }



  //function that creates an ARRAY of 8 most recent items in PAST node to pass to State if there is nothing in PAST, if not it sets the content of PAST to state
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
    }).then((snapshot) => {
      //create variable of the snapshot of PAST node and set it as State
      const firebaseStatePast = snapshot.val() 
      if(firebaseStatePast === null) {
        this.callFirebaseForGuest()
        return;
      }
      let newFirebase = firebaseStatePast.slice(-8)
      this.setState({
        lineGraph: newFirebase
      })
    })
  };

  callFirebaseForGuest = () => {
    const dbRefpast = firebase.database().ref(`/${this.props.user.uid}/past`);
    dbRefpast.once('value', (snapshot) => {
      let firebaseStatePast = snapshot.val()
      let newFirebase = firebaseStatePast.slice(-8)
      this.setState({
        lineGraph: newFirebase
      })
    })
  }

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
    }).then((snapshot) => {
  
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
      text: "Submit your week",
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
  
  //function that Switches Dashboard from Weekly Pie chart to Monthly Line Graph
  switchView = () => {
    this.state.showPie ?
      this.setState({
        showPie: false,
      })
      :
      this.setState({
        showPie: true
      })
  }

  render() {
    if (!this.props.user) return null;
    return (
      <div>
        {this.props.user ?
        (<div className="dashboard">
            <main>
            <div className="navigation">
              <div className="arrowLeft">
                <Link to="/"><img src={require("./assets/arrowLeft.png")} alt="arrow pointing left" /> Return to Search  </Link>
              </div>

                <Route exact path="/" component={Search}/>
                <button onClick={this.switchView}>Switch View</button>
                {/* </div> */}
            </div>

            {this.state.showPie ? 
                <Responsivepie
                garbageBags={this.state.garbageBags}
                greenBags={this.state.greenBags}
                blueBags={this.state.blueBags}
                /> : 
                <Responsiveline lineGraph={this.state.lineGraph} />}

              <form className="goalsForm" onSubmit={this.onSubmitDashboard}>

            <div className="buttonBoxGallery wrapper">
              <div className="buttonBox">
                <img src={require('./assets/garbageIcon.png')} alt="An icon of a garbage bin" />
                <label className="visuallyhidden">Number of Garbage Bags</label>
                <button
                  id="garbageBags"
                  data-bag={this.state.garbageBags}
                  type="number"
                  value={this.state.garbageBags}
                  onClick={this.addBag} >
                  Garbage +{this.state.garbageBags}
                </button>
              </div>
          

              <div className="buttonBox">
                <img src={require('./assets/greenbinIcon.png')} alt="an Icon of a GreenBin" />
                <label className="visuallyhidden">Number of Compost Bags</label>
                <button
                  id="greenBags"
                  data-bag={this.state.greenBags}
                  type="number"
                  value={this.state.greenBags}
                  onClick={this.addBag} >
                 Green Bin +{this.state.greenBags}
                </button>
              </div>
                

              <div className="buttonBox">
                <img src={require('./assets/recyclingIcon.png')} alt="an Icon of a recycling bin" />
                <label className="visuallyhidden">Number of Recycling Bags</label>
                <button
                  id="blueBags"
                  data-bag={this.state.blueBags}
                  type="number"
                  value={this.state.blueBags}
                  onClick={this.addBag} >
                  Recyling +{this.state.blueBags}
                </button>
              </div>
              </div>
                
                <label htmlFor="submitTracking" className="visuallyhidden" >Submit items to track your progress</label>
                <input 
                id="submitTracking"
                type="submit" 
                value="Submit"
                className="submitTracking"
                /> 
                
              </form>
            </main>
        </div>
    )
    :
    (<h4>You must be logged in to see this page</h4>)
    }
    </div>
  )}


}
export default Dashboard