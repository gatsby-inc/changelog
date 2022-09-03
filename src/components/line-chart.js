import React from 'react';

const CHART_MAX_WIDTH = 600;
const CHART_MAX_HEIGHT = 250;

const LineChart = ({ data }) => {
  const max_x = data.total_weeks * (data.week_length - 1);
  const max_y = data.day_commit_max;
  const pad_left = 20;
  const pad_right = 55;
  const pad_top = 25;
  const pad_bottom = 40;

  const value_size = 4;
  const label_size = 6;
  const date_size = 3;
  const y_labels = [...Array(data.day_commit_max).keys()].filter((n) => n % 2 === 0);

  const points = data.commits
    .map((point, p) => {
      const { days } = point;
      const plot = days.map((day, d) => {
        const x = (((days.length - 1) * p + d + pad_left) * (CHART_MAX_WIDTH - pad_right)) / max_x;
        const y = CHART_MAX_HEIGHT - pad_bottom / 2 - (day / max_y) * (CHART_MAX_HEIGHT - pad_top * 2);
        return `${x},${y}`;
      });

      return plot;
    })
    .flat();

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <svg viewBox={`0 0 ${CHART_MAX_WIDTH} ${CHART_MAX_HEIGHT}`}>
        {y_labels.map((value, i) => {
          const ratio = i / y_labels.length;
          const y = CHART_MAX_HEIGHT - pad_bottom / 2 - (CHART_MAX_HEIGHT - pad_bottom) * ratio;

          return (
            <text
              key={i}
              x={14}
              y={y}
              className="fill-gray-400 font-semibold"
              style={{
                fontSize: label_size
              }}
            >
              {value}
            </text>
          );
        })}
        {data.commits.map((point, i) => {
          const { days, date_string } = point;
          const label = days.map((value, v) => {
            const index = i * days.length + v;
            const plot = points[index].split(',');
            const x = plot[0];
            const y = plot[1] - value_size;

            return (
              <g key={v}>
                {value > 0 ? (
                  <text
                    x={x}
                    y={y}
                    className="fill-gray-300 font-semibold"
                    style={{ fontSize: value_size }}
                  >{`x${value}`}</text>
                ) : null}

                {v === 0 ? (
                  <text
                    x={x}
                    y={CHART_MAX_HEIGHT - 10}
                    className="fill-gray-300 font-semibold"
                    style={{ fontSize: date_size }}
                  >
                    {date_string}
                  </text>
                ) : null}
              </g>
            );
          });
          return label;
        })}
        <defs>
          <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#7026B9" />
            <stop offset="100%" stop-color="#3fa9f5" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="url(#linear)" strokeWidth={1} points={points.join(' ')} />
      </svg>
    </div>
  );
};

export default LineChart;
