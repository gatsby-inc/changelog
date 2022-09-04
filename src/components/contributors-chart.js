import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

const CHART_MAX_WIDTH = 600;
const CHART_MAX_HEIGHT = 250;
const TOOLTIP_WIDTH = 140;
const TOOLTIP_HEIGHT = 160;

const ContributorChart = memo(({ data, id, href }) => {
  const [tooltip, setTooltip] = useState(null);

  const handleClick = (atttributes) => {
    setTooltip(atttributes);
  };

  const handleClose = () => {
    setTooltip(null);
  };

  const max_x = data.total_contributors;
  const max_y = data.contributor_max;
  const pad_left = 20;
  const pad_right = 40;
  const pad_top = 25;
  const pad_bottom = 60;

  const value_size = 5;
  const label_size = 5;
  const image_size = 10;
  const bar_gap = 2;
  const y_labels = [...Array(max_y).keys()].filter((n) => n % 20 === 0);
  const x_guides = [...Array(10).keys()];

  const points = data.contributors.map((item, index) => {
    const { capped_total } = item;

    const x = CHART_MAX_WIDTH / max_x + ((index + bar_gap) * (CHART_MAX_WIDTH - pad_right)) / max_x;
    const y = CHART_MAX_HEIGHT - pad_bottom / 2 - (capped_total / max_y) * (CHART_MAX_HEIGHT - pad_top * 2);
    return `${x},${y}`;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-6">
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
      </div>
      <svg viewBox={`0 0 ${CHART_MAX_WIDTH} ${CHART_MAX_HEIGHT}`}>
        <defs>
          <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7026B9" />
            <stop offset="100%" stopColor="#3fa9f5" />
          </linearGradient>
        </defs>

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

        {points.map((point, index) => {
          const plot = points[index].split(',');
          const x = plot[0];
          const y = plot[1];
          const height = CHART_MAX_HEIGHT - y - pad_top - 5;
          return <rect key={index} x={x} y={y} width={1} height={height} fill="url(#linear)" rx={1} />;
        })}

        {data.contributors.map((point, index) => {
          const { total } = point;
          const plot = points[index].split(',');
          const x = plot[0];
          const y = plot[1];

          return (
            <g key={index}>
              <text
                x={x - value_size / 2}
                y={y}
                className="fill-gray-300 font-semibold -rotate-45"
                style={{ fontSize: value_size, transformBox: 'fill-box' }}
              >{`x${total}`}</text>
            </g>
          );
        })}

        {tooltip ? (
          <foreignObject
            x={tooltip.x < CHART_MAX_WIDTH / 2 ? tooltip.x : tooltip.x - TOOLTIP_WIDTH}
            y={CHART_MAX_HEIGHT - CHART_MAX_HEIGHT + CHART_MAX_HEIGHT / 2 - TOOLTIP_HEIGHT / 4}
            width={TOOLTIP_WIDTH}
            height={TOOLTIP_HEIGHT}
          >
            <div className="relative shadow rounded border border-gray-100 bg-white p-2">
              <button
                className="absolute leading-tight text-[7px] text-gray-400 top-[2px] right-[4px] w-[12px] h-[12px] hover:text-gray-500 hover:bg-gray-100"
                onClick={handleClose}
              >
                x
              </button>
              <div className="flex flex-col text-[8px]">
                <div>
                  {tooltip.login}
                  <strong className="ml-1 text-brand-primary">
                    <span className="text-[6px]">x</span>
                    {tooltip.total}
                  </strong>
                </div>
                <a
                  href={tooltip.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[6px] text-brand-primary hover:text-brand-secondary"
                >
                  {tooltip.html_url}
                </a>
              </div>
            </div>
          </foreignObject>
        ) : null}

        {data.contributors.map((point, index) => {
          const { login, html_url, avatar_url, total } = point;
          const plot = points[index].split(',');
          const x = plot[0];
          const y = plot[1];

          return (
            <g key={index}>
              <foreignObject
                x={x - image_size / 2}
                y={CHART_MAX_HEIGHT - 25}
                width={image_size}
                height={image_size}
                onClick={() => handleClick({ login, html_url, total, x, y })}
              >
                <img
                  src={avatar_url}
                  className="rounded-full overflow-hidden cursor-pointer hover:opacity-50"
                  alt={login}
                  width={image_size}
                  height={image_size}
                />
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
});

ContributorChart.propTypes = {
  /** The API response */
  data: PropTypes.any.isRequired,
  /** The id required for the chart */
  id: PropTypes.string.isRequired,
  /** The link */
  href: PropTypes.string.isRequired
};

export default ContributorChart;
