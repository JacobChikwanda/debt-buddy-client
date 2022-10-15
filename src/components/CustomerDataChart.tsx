import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLine } from 'victory';

interface DataChartProps {
  months: any,
  data: any
}

// , 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
const CustomerDataChart: React.FC<DataChartProps> = ({data, months}) => {
    return (
        <div>
            <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
        animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
        }}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1, 2, 3]}
          tickFormat={months}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => x * 1}
        />
        <VictoryBar
          data={data}
          x="month"
          y="number"
        />
      </VictoryChart>
        </div>
    );
};

export default CustomerDataChart;