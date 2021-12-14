import React, {FC, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

export interface dataPlot {
    x: number,
    y: number,
}
interface areaChartProps {
    data: dataPlot[],
    height: number | string | undefined,
    width: number | string | undefined,
    lineColor?: string | undefined,
    xAxisVisible?: boolean | undefined, 
    yAxisVisible?: boolean | undefined,
    yTickValue?: number[],
    xTickValue?: number[],



}
export const AreaChart: FC<areaChartProps> = (props) => {
    const VerticalThemes = {
        axis:  { 
            visible: props.yAxisVisible, 
            stroke: {
                dashArray: [4]
            }
        }
    }

    const HorizontalThemes = {
        axis: { 
            stroke: { 
                color: 'white', 
                dashArray: [3]
            }, 
            visible: props.xAxisVisible
        }, 
        labels: {   
            label: { 
                color: '#000',
                fontSize: 10,
                textAnchor: 'middle',
                opacity: 1,
                dx: 0,
                dy: -12,rotation: 0
            }, 
            visible: true
        }
    }
    return (
        <Chart
            style={{ height: props.height, width: props.width, padding: 0, margin: 0,}}
            data={props.data.map((dataPoint) => {
                return {x: dataPoint.x, y: dataPoint.y}
            })}
            padding={{ left: 10, bottom: 20, right: 10, top: 20 }}

            // need to set x and y domain as props => become reusable
            xDomain={{ min: 0, max: 10000000}}
            yDomain={{ min: -4, max: 170}}
            
            >   
            <VerticalAxis  theme={VerticalThemes} tickValues={props.yTickValue}/>
            <HorizontalAxis  theme={HorizontalThemes} tickValues={props.xTickValue}/>
            <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} />
            <Line theme={{ stroke: { color: '#44bd32', width: 3}}} smoothing={'none'} />
        </Chart>    
    )
}


