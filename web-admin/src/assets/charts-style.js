import { assign } from 'lodash';
import theme from '../styles/styledComponentTheme';

// *
// * Colors
// *
const colors = ['#252525', '#525252', '#737373', '#969696', '#bdbdbd', '#d9d9d9', '#f0f0f0'];

const mainColor = theme.font;
const grey = '#969696';
// *
// * Typography
// *
const sansSerif = `'Source Sans Pro', sans-serif`;
const letterSpacing = 'normal';
const fontSize = 14;
// *
// * Layout
// *
const baseProps = {
  colorScale: colors,
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: mainColor,
  stroke: 'transparent',
};

const centeredLabelStyles = assign({ textAnchor: 'middle' }, baseLabelStyles);
// *
// * Strokes
// *
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

export const ChartsStyle = {
  area: assign(
    {
      style: {
        data: {
          fill: mainColor,
          fillOpacity: 0.1,
          stroke: mainColor,
          strokeWidth: 1,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  axis: assign(
    {
      style: {
        axis: {
          fill: 'transparent',
          stroke: mainColor,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        axisLabel: assign({}, centeredLabelStyles, {
          padding: 25,
        }),
        grid: {
          fill: 'none',
          stroke: 'none',
          pointerEvents: 'painted',
        },
        ticks: {
          fill: 'transparent',
          size: 1,
          stroke: 'transparent',
        },
        tickLabels: baseLabelStyles,
      },
    },
    baseProps
  ),
  bar: assign(
    {
      style: {
        data: {
          fill: mainColor,
          padding: 8,
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  boxplot: assign(
    {
      style: {
        max: {
          padding: 8,
          stroke: mainColor,
          strokeWidth: 1,
        },
        maxLabels: baseLabelStyles,
        median: {
          padding: 8,
          stroke: mainColor,
          strokeWidth: 1,
        },
        medianLabels: baseLabelStyles,
        min: {
          padding: 8,
          stroke: mainColor,
          strokeWidth: 1,
        },
        minLabels: baseLabelStyles,
        q1: {
          padding: 8,
          fill: grey,
        },
        q1Labels: baseLabelStyles,
        q3: {
          padding: 8,
          fill: grey,
        },
        q3Labels: baseLabelStyles,
      },
      boxWidth: 20,
    },
    baseProps
  ),
  candlestick: assign(
    {
      style: {
        data: {
          stroke: mainColor,
          strokeWidth: 1,
        },
        labels: baseLabelStyles,
      },
      candleColors: {
        positive: '#ffffff',
        negative: mainColor,
      },
    },
    baseProps
  ),
  chart: baseProps,
  errorbar: assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: 'transparent',
          stroke: mainColor,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  group: assign(
    {
      colorScale: colors,
    },
    baseProps
  ),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle',
      },
      labels: baseLabelStyles,
      title: assign({}, baseLabelStyles, { padding: 5 }),
    },
  },
  line: assign(
    {
      style: {
        data: {
          fill: 'transparent',
          stroke: mainColor,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: 'transparent',
        strokeWidth: 1,
      },
      labels: assign({}, baseLabelStyles, { padding: 20 }),
    },
    colorScale: colors,
    width: 400,
    height: 400,
    padding: 50,
  },
  scatter: assign(
    {
      style: {
        data: {
          fill: mainColor,
          stroke: 'transparent',
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  stack: assign(
    {
      colorScale: colors,
    },
    baseProps
  ),
  tooltip: {
    style: assign({}, baseLabelStyles, {
      padding: 5,
      pointerEvents: 'none',
    }),
    flyoutStyle: {
      stroke: mainColor,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none',
    },
    cornerRadius: 5,
    pointerLength: 10,
  },
  voronoi: assign(
    {
      style: {
        data: {
          fill: 'transparent',
          stroke: 'transparent',
          strokeWidth: 0,
        },
        labels: assign({}, baseLabelStyles, {
          padding: 5,
          pointerEvents: 'none',
        }),
        flyout: {
          stroke: mainColor,
          strokeWidth: 1,
          fill: '#f0f0f0',
          pointerEvents: 'none',
        },
      },
    },
    baseProps
  ),
};
