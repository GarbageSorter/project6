import React, { Component } from 'react';
import { render } from 'react-dom'
import { ResponsiveLine } from '@nivo/line';
import './App.css';

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

class Responsiveline extends Component {
   constructor() {
      super()
   }

   render() {
      if (!this.props.lineGraph) return null;
      return(
         <div className="LineApp wrapper">
         <ResponsiveLine
                  data={[
                     {
                        "id": "Recycling",
                        "color": "hsl(215, 70%, 50%)",
                        "data": [
                            {
                              "x": "1",
                              "y": this.props.lineGraph[0].blueBags
                            },
                            {
                              "x": "2",
                              "y": this.props.lineGraph[1].blueBags
                            },
                            {
                              "x": "3",
                              "y": this.props.lineGraph[2].blueBags
                            },
                            {
                              "x": "4",
                              "y": this.props.lineGraph[3].blueBags
                            },
                            {
                              "x": "5",
                              "y": this.props.lineGraph[4].blueBags
                            },
                            {
                              "x": "6",
                              "y": this.props.lineGraph[5].blueBags
                            },
                            {
                              "x": "7",
                              "y": this.props.lineGraph[6].blueBags
                            },
                            {
                              "x": "8",
                              "y": this.props.lineGraph[7].blueBags
                            },
                        ]
                     },
                     {
                        "id": "Garbage",
                        "color": "hsl(204, 70%, 50%)",
                        "data": [
                            {
                              "x": "1",
                              "y": this.props.lineGraph[0].garbageBags
                            },
                            {
                              "x": "2",
                              "y": this.props.lineGraph[1].garbageBags
                            },
                            {
                              "x": "3",
                              "y": this.props.lineGraph[2].garbageBags
                            },
                            {
                              "x": "4",
                              "y": this.props.lineGraph[3].garbageBags
                            },
                            {
                              "x": "5",
                              "y": this.props.lineGraph[4].garbageBags
                            },
                            {
                              "x": "6",
                              "y": this.props.lineGraph[5].garbageBags
                            },
                            {
                              "x": "7",
                              "y": this.props.lineGraph[6].garbageBags
                            },
                            {
                              "x": "8",
                              "y": this.props.lineGraph[7].garbageBags
                            }
                          ]
                      },
                      {
                        "id": "Green",
                        "color": "hsl(58, 70%, 50%)",
                        "data": [
                            {
                              "x": "1",
                              "y": this.props.lineGraph[0].greenBags
                            },
                            {
                              "x": "2",
                              "y": this.props.lineGraph[1].greenBags
                            },
                            {
                              "x": "3",
                              "y": this.props.lineGraph[2].greenBags
                            },
                            {
                              "x": "4",
                              "y": this.props.lineGraph[3].greenBags
                            },
                            {
                              "x": "5",
                              "y": this.props.lineGraph[4].greenBags
                            },
                            {
                              "x": "6",
                              "y": this.props.lineGraph[5].greenBags
                            },
                            {
                              "x": "7",
                              "y": this.props.lineGraph[6].greenBags
                            },
                            {
                              "x": "8",
                              "y": this.props.lineGraph[7].greenBags
                            }
                        ]
                      }
                  ]}
                  margin={{
                     "top": 50,
                     "right": 100,
                     "bottom": 50,
                     "left": 75
                  }}
                  xScale={{
                     "type": "point"
                  }}
                  yScale={{
                     "type": "linear",
                     "stacked": false,
                     "min": "auto",
                     "max": "auto"
                  }}
                  axisBottom={{
                     "orient": "bottom",
                     "tickSize": 5,
                     "tickPadding": 5,
                     "tickRotation": 0,
                     "legend": "Weeks",
                     "legendOffset": 26,
                     "legendPosition": "middle"
                  }}
                  axisLeft={{
                     "orient": "left",
                     "tickSize": 2,
                     "tickPadding": 5,
                     "tickRotation": 0,
                     "legend": "# of Bags",
                     "legendOffset": -40,
                     "legendPosition": "middle"
                  }}
                  enableGridY={true}
                  colors="category10"
                  curve={"catmullRom"}
                  lineWidth={3}
                  lineHeight={3}
                  enableDots={true}
                  dotSize={10}
                  dotColor="inherit:darker(0.3)"
                  dotBorderWidth={2}
                  dotBorderColor="#ffffff"
                  enableDotLabel={true}
                  dotLabel="y"
                  dotLabelYOffset={-12}
                  areaBlendMode="overlay"
                  areaOpacity={0.9}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  legends={[
                     {
                        "anchor": "bottom-right",
                        "direction": "column",
                        "justify": false,
                        "translateX": 100,
                        "translateY": 0,
                        "itemsSpacing": 0,
                        "itemDirection": "left-to-right",
                        "itemWidth": 80,
                        "itemHeight": 20,
                        "itemOpacity": 1,
                        "symbolSize": 15,
                        "symbolShape": "circle",
                        "symbolBorderColor": "rgba(0, 0, 0, .5)",
                        "effects": [
                           {
                              "on": "hover",
                              "style": {
                                 "itemBackground": "rgba(0, 0, 0, .03)",
                                 "itemOpacity": 1
                              }
                           }
                        ]
                     }
                  ]}
               />
   </div>)}
}


export default Responsiveline;
