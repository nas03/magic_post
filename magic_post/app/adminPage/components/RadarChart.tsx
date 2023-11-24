import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'Service',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Speech',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Careful',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Completed',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Damaged',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Atitude',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const Radar_Chart = () => {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" className=' text-sm' />
          <PolarRadiusAxis />
          <Radar name="Magic Post" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
}

export default Radar_Chart
