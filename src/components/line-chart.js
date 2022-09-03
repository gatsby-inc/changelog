import React from 'react';

const CHART_MAX_WIDTH = 600;
const CHART_MAX_HEIGHT = 250;

const LineChart = ({ data }) => {
  const max_x = data.total_weeks * (data.week_length - 1);
  const max_y = data.day_commit_max;
  const pad_left = 20;
  const pad_right = 55;
  const pad_top = 25;
  const pad_bottom = 60;

  const value_size = 5;
  const label_size = 5;
  const date_size = 5;
  const y_labels = [...Array(data.day_commit_max).keys()].filter((n) => n % 2 === 0);
  const x_guides = [...Array(10).keys()];

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
        {x_guides.map((n, i) => {
          const ratio = i / x_guides.length;
          const gap = 10;
          const y = CHART_MAX_HEIGHT - pad_bottom / 2 - CHART_MAX_HEIGHT * ratio;

          return (
            <polyline
              key={i}
              fill="none"
              className="stroke-gray-200"
              strokeWidth={0.5}
              points={`${pad_left + gap},${y} ${CHART_MAX_WIDTH - gap},${y}`}
            />
          );
        })}

        {y_labels.map((value, i) => {
          const ratio = i / y_labels.length;
          const gap = 10;
          const y = CHART_MAX_HEIGHT - pad_bottom / 2 - (CHART_MAX_HEIGHT - pad_bottom + gap) * ratio;

          return (
            <text
              key={i}
              x={14}
              y={y}
              className="fill-gray-300 font-semibold"
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
            const x = plot[0] - value_size / 2;
            const y = plot[1];

            return (
              <g key={v}>
                {value > max_y - max_y / 2 ? (
                  <text
                    x={x}
                    y={y}
                    className="fill-gray-300 font-semibold -rotate-45"
                    style={{ fontSize: value_size, transformBox: 'fill-box' }}
                  >{`x${value}`}</text>
                ) : null}

                {v === 0 ? (
                  <text
                    x={x}
                    y={CHART_MAX_HEIGHT - 20}
                    className="fill-gray-300 font-semibold rotate-45"
                    style={{ fontSize: date_size, transformBox: 'fill-box' }}
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
            <stop offset="0%" stopColor="#7026B9" />
            <stop offset="100%" stopColor="#3fa9f5" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="url(#linear)" strokeWidth={0.8} points={points.join(' ')} />
      </svg>
    </div>
  );
};

export default LineChart;
