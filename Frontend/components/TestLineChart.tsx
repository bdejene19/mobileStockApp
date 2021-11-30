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

}
export const TestLineChart: FC<areaChartProps> = (props) => {

    return (
        <Chart
            style={{ height: props.height, width: props.height, padding: 0, margin: 0,}}
            data={props.data.map((dataPoint) => {
                return {x: dataPoint.x, y: dataPoint.y}
            })}
            padding={{ left: 10, bottom: 20, right: 10, top: 20 }}
            xDomain={{ min: -2, max: 10 }}
            yDomain={{ min: -4, max: 20 }}
            >
            {/* <VerticalAxis tickCount={3} theme={{ labels: { formatter: (v) => v.toFixed} }} /> */}
            <HorizontalAxis  theme={{axis: { stroke: { color: 'white', dashArray: [3]}}}}/>
            <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} />
            <Line theme={{ stroke: { color: '#44bd32', width: 3}}} smoothing={'cubic-spline'} />
        </Chart>    
    )
}
