import React from 'react'
import { View, Text } from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
export default function TestLineChart() {
    return (

        <Chart
            style={{ height: '100%', width: '100%', padding: 0, margin: 0, borderColor: 'white', borderWidth: 3,}}
            data={[
                { x: -2, y: 15 },
                { x: -1, y: 10 },
                { x: 0, y: 12 },
                { x: 1, y: 7 },
                { x: 2, y: 6 },
                { x: 3, y: 3 },
                { x: 4, y: 5 },
                { x: 5, y: 8 },
                { x: 6, y: 12 },
                { x: 7, y: 14 },
                { x: 8, y: 12 },
                { x: 9, y: 13.5 },
                { x: 10, y: 18 },
            ]}
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
