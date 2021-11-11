import { LineChart, Line } from 'recharts';
import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

export const RenderLineChart = () => {
    const [line, setline] = useState()
    
    useEffect(() => {
        setline()

    }, [])

    return (
        <Text>{line}</Text>

    )
  
};
