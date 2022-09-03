import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_TYPE = 'line';
const ALT_TYPE = 'bar';
const CHART_MAX_WIDTH = 600;
const CHART_MAX_HEIGHT = 250;

const CommitChart = ({ data, type, id, href }) => {
  const [isChecked, setIsChecked] = useState(type !== INITIAL_TYPE);

  const handleChange = (event) => {
    setIsChecked(!isChecked);
  };

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
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="grid">
          <h2 className="text-lg font-bold text-gray-800 capitalize">{id}</h2>
          <small className="text-xs hidden sm:block">
            <a
              href={`https://${href}`}
              target="_blank"
              rel="noreferrer"
              className="text-brand-primary hover:text-brand-secondary"
            >
              {href}
            </a>
          </small>
        </div>
        <div>
          <label htmlFor={id} className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              id={id}
              className="sr-only peer"
              onChange={handleChange}
              checked={isChecked}
            />
            <span className="mr-3 text-sm font-medium text-gray-400 capitalize w-[24px]">
              {isChecked ? ALT_TYPE : INITIAL_TYPE}
            </span>
            <div className="w-9 h-5 bg-blue-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-400 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[38px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-primary" />
          </label>
        </div>
      </div>
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
        {isChecked ? (
          <Fragment>
            {points.map((point, index) => {
              const plot = points[index].split(',');
              const x = plot[0];
              const y = plot[1];
              const height = CHART_MAX_HEIGHT - y - pad_top - 5;
              return <rect key={index} x={x} y={y} width={1} height={height} fill="url(#linear)" />;
            })}
          </Fragment>
        ) : (
          <polyline fill="none" stroke="url(#linear)" strokeWidth={0.8} points={points.join(' ')} />
        )}
      </svg>
    </div>
  );
};

CommitChart.defaultProps = {
  type: INITIAL_TYPE
};

CommitChart.propTypes = {
  /** The type of chart */
  type: PropTypes.oneOfType([INITIAL_TYPE, ALT_TYPE]),
  /** The id required for the input label */
  id: PropTypes.string.isRequired,
  /** The link */
  href: PropTypes.string.isRequired
};

export default CommitChart;
