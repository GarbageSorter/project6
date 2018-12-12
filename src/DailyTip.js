

// to add to the main app page add import DailyTip from './DailyTip'; to the top of the page and and <DailyTips /> somewhere on the page to view, this is just a rough thing we can improve stlying/format TBA

//add styling code at bottom of page to './App.css' file for a better visual exp.

//"stretch Goals"
//mutiple buttons for different kinds of tips? ie recycling/garbage/green
//animations
//editing more goals/pcitures
//finalize styling with group


import React, { Component } from 'react';
import './App.css';
import tips from './tips.js';

class App extends Component {
  
    constructor() {
    super();
    this.state = {
        title: '',
        description: '',
        picture: ''
    }
  }
  componentDidMount(){
    this.newTip();
  }
  
  newTip = () => {
    // Randomize a tip with the code block below
    const number = (Math.floor(Math.random() * tips.length)); 
    const tip = tips[number].description;    
    const title = tips[number].title;
    const picture = tips[number].picture;
    
    this.setState(
        {
        description: tip,
        title: title,
        picture: picture
    })
  }

  render() {
    return (
        <div className="center-tip">
            <Text 
            tip={this.state.description} 
            title={this.state.title}
            picture={this.state.picture} />
            <Buttons 
            handleNewTip={this.newTip} 
            tip={this.state.description} 
            title={this.state.title} />
        </div>
        )
    }
}

// TEXT COMPONENT
class Text extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="center-div">
                <h3>{this.props.title}</h3>
                <p>{this.props.tip}</p>
            </div>
        )
    }
}

// BUTTONS COMPONENT
class Buttons extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div>
                <button 
                type="button"
                className="nextTip"
                onClick={this.props.handleNewTip}>New Tip</button> 
                <a target="_blank" href={`https://twitter.com/intent/tweet/?text= 🔥Hot ${this.props.title} ${this.props.tip}`}>
                <button className="tweet">Tweet Tip</button></a>   
            </div>
        )
    }
}

export default App;


// STYLING TO ADD TO THIS CODE BLOCK

// @import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

// body {
//   font-family: 'Raleway', sans-serif;
//   color: white;
// }

// .center-tip {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: 0 auto;
//   width: 60%;
//   background: linear-gradient(35deg, rgb(109,175,49),rgb(0,104,59));
//   padding: 10px 20px;
//   border-radius: 35px;
// }

// .center-div {
//   display: flex;
//   flex-direction: column;
//   margin: 0 auto;  
//   text-align: center;
//   padding: 20px;
// }

// button {
//   margin: 5px;
//   -webkit-user-select: none; /* Safari */        
//   -moz-user-select: none; /* Firefox */
//   -ms-user-select: none; /* IE10+/Edge */
//   user-select: none; /* Standard */
// }

// img {
//   margin: 0 auto;
// }

// h1 {
//   font-weight: bold;
// }

// .nextTip {
//     background-color: rgb(16,135,209);

// }

// .nextTip,
// .tweet {
//   background-color: rgb(16,135,209);
// 	color: white;
//   border: 1px solid white;
//   border-radius: 3px;
// 	padding: 10px;
// 	cursor: pointer;
// 	outline: inherit;
// }