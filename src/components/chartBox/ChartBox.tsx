import './chartbox.scss';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

type PropsType = {
  color: string;
  icon: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
};
import { Tooltip } from 'recharts';

const ChartBox = ({
  title,
  number,
  icon,
  chartData,
  color,
  dataKey,
  percentage,
}: PropsType) => {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={`${icon}`} alt="" />
          <span>{title}</span>
        </div>
        <h1>{number}</h1>
        <Link to="/" style={{ color: color }}>
          View All
        </Link>
      </div>
      <div className="chartInfo">
        {/* chart */}
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={chartData}>
              <Tooltip
                contentStyle={{ background: 'transparent', border: 'none' }}
                labelStyle={{ display: 'none' }}
                position={{ x: 10, y: 60 }}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* end of chart */}
        <div className="texts">
          <span
            className="percentage"
            style={{ color: percentage < 0 ? 'tomato' : 'limegreen' }}
          >
            {percentage}%
          </span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
