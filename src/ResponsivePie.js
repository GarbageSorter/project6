import React, { Component } from 'react';
import { render } from 'react-dom'
import { ResponsivePie } from 'nivo';
import './App.css';

// npm install @nivo/pie --save NPM INSTALL THAT 

class Responsivepie extends Component {

   render() {
      if (!this.props) return null && console.log("you fail"); {
      return (
         <div className="PieApp wrapper">
            {this.props.greenBags === 0 && this.props.blueBags === 0 && this.props.garbageBags === 0 ? <div className="placeHolderStuff">
            <img src={require('./assets/Racoon.png')} alt="A illustration of a Racoon in a trash can" />
            <h3>Start Logging Your Weekly Garbage</h3>
            </div> :
            <ResponsivePie
               data={[
                  {
                     "id": "Garbage",
                     "label": "Garbage",
                     "value": this.props.garbageBags,
                     "color": "hsl(0, 0%, 67%)",
                  },
                  {
                     "id": "Recycling",
                     "label": "Recycling",
                     "value": this.props.blueBags,
                     "color": "hsl(243, 70%, 50%)"
                  },
                  {
                     "id": "Green Bin",
                     "label": "Green Bin",
                     "value": this.props.greenBags,
                     "color": "hsl(316, 70%, 50%)"
                  },
               ]}
               margin={{
                  "top": 20,
                  "right": 50,
                  "bottom": 40,
                  "left": 50
               }}
               innerRadius={0.25}
               padAngle={0.7}
               cornerRadius={3}
               colors={"set1"}
               colorBy="id"
               radialLabelsSkipAngle={10}
               radialLabelsLinkStrokeWidth={50}
               radialLabelsTextXOffset={6}
               radialLabelsTextColor="#00702e"
               radialLabelsLinkOffset={0}
               radialLabelsLinkDiagonalLength={16}
               radialLabelsLinkHorizontalLength={24}
               radialLabelsLinkStrokeWidth={2}
               slicesLabelsSkipAngle={10}
               slicesLabelsTextColor="#000"
               animate={true}
               motionStiffness={90}
               motionDamping={15}
               defs={[
                  {
                     "id": "dots",
                     "type": "patternDots",
                     "background": "hsl(0, 0%, 67%)",
                     "color": "rgba(255, 255, 255, 0.3)",
                     "size": 4,
                     "padding": 1,
                     "stagger": true
                  },
                  {
                     "id": "lines",
                     "type": "patternLines",
                     "background": "inherit",
                     "color": "rgba(255, 255, 255, 0.3)",
                     "rotation": -45,
                     "lineWidth": 6,
                     "spacing": 10
                  }
               ]}
               fill={[
                  {
                     "match": {
                        "id": "Garbage"
                     },
                     "id": "dots"
                  },
               ]}
               legends={[
                  {
                     "anchor": "bottom",
                     "direction": "row",
                     "translateY": 56,
                     "itemWidth": 100,
                     "itemHeight": 18,
                     "itemTextColor": "#999",
                     "symbolSize": 18,
                     "symbolShape": "circle",
                     "effects": [
                        {
                           "on": "hover",
                           "style": {
                              "itemTextColor": "#000"
                           }
                        }
                     ]
                  }
               ]}
               />}
         </div>
    )}}}

export default Responsivepie;
