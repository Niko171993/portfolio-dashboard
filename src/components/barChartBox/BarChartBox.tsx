import './barchartbox.scss';
import { ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';

type BarChartBoxType = {
  title: string;
  color: string;
  dataKey: string;
  chartData: object[];
};
const BarChartBox = ({ title, chartData, color, dataKey }: BarChartBoxType) => {
  return (
    <div className="barChartBox">
      <h1>{title}</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <BarChart data={chartData}>
            <Tooltip
              contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
            />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
