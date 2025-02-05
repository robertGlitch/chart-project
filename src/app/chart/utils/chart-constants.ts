import { Chart } from "chart.js";

export const addCustomBackground = (colorForFill: string) => ({
  id: 'customBackground',
  beforeDraw(chart: Chart): boolean | void {
    const { ctx, chartArea: { top, left, width, height } } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = colorForFill;
    ctx.fillRect(left, top, width, height);
    ctx.restore();
  }
});


export const aircraftStyles = {
  pointStyle: (ctx: any) => {
    return ctx.raw?.id ? 'rectRot' : 'triangle'
  },
  pointRadius: 6,
  pointHoverRadius: 6,
  borderColor: (ctx: any) => {
    return ctx.raw?.id ? '#bbcff0' : '#cc0202'
  },
  pointHoverBorderColor: (ctx: any) => {
    return ctx.raw?.id ? '#bbcff0' : '#cc0202'
  },
  borderWidth: 2,
  pointHoverBorderWidth: 2,

}

export const aircraftDatalabels = {
  datalabels: {
    display: true,
    color: (ctx: any) => {
      const point = ctx.dataset.data[ctx.dataIndex];
      return point?.id ? '#bbcff0' : '#cc0202'
    },
    anchor: 'end',
    align: 'end',
    clip: true,
    offset: -3,
    formatter: function (value: any, _context: any) {
      return value.flightName
    }
  }
}

export const tooltipStyles = {
  displayColors: false,
}


const cityAnnotationStyle = {
  type: 'label',
  color: '#7064f5',
  borderRadius: 0,
  borderWidth: 0,
  drawTime: 'beforeDatasetsDraw',
  font: {
    size: 16
  }
};

const radarAnnotationStyle = {
  type: 'point',
  borderColor: '#009900',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  borderWidth: 1,
  drawTime: 'beforeDatasetsDraw'
};

export const missleStyles = {
  pointStyle: 'triangle',
  pointRadius: 6,
  pointHoverRadius: 6,
  borderColor: '#f7f752',
  pointHoverBorderColor: '#f7f752',
  borderWidth: 2,
  pointHoverBorderWidth: 2,

}

export const samAnnotationStyle = {
  xValue: 70,
  yValue: 70,
  type: 'point',
  pointStyle: 'cross',
  borderColor: '#f7f752',
  backgroundColor: 'transparent',
  borderWidth: 3,
  radius: 12,
  drawTime: 'beforeDatasetsDraw'
};

export const samRadiusAnnotationStyle = {
  radius: 0,
  xMin: 30,
  xMax: 110,
  yMin: 30,
  yMax: 110,
  type: 'point',
  borderColor: '#f7f752',
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderDash: [6, 6],
  drawTime: 'beforeDatasetsDraw'
};


export const annotations: any = {
  'city1': { ...cityAnnotationStyle, content: 'ZAG', xValue: 75, yValue: 75 },
  'city2': { ...cityAnnotationStyle, content: 'LJU', xValue: 20, yValue: 100 },
  'city3': { ...cityAnnotationStyle, content: 'MBX', xValue: 45, yValue: 125 },
  'city4': { ...cityAnnotationStyle, content: 'RJK', xValue: 15, yValue: 35 },
  'city5': { ...cityAnnotationStyle, content: 'BNX', xValue: 135, yValue: 15 },

  'radar0': { ...radarAnnotationStyle, radius: 0, xMin: 65, xMax: 85, yMin: 65, yMax: 85 },
  'radar1': { ...radarAnnotationStyle, radius: 0, xMin: 45, xMax: 105, yMin: 45, yMax: 105 },
  'radar2': { ...radarAnnotationStyle, radius: 0, xMin: 15, xMax: 135, yMin: 15, yMax: 135 },
  'radar3': { ...radarAnnotationStyle, radius: 0, xMin: -15, xMax: 165, yMin: -15, yMax: 165 },
  'radar4': { ...radarAnnotationStyle, radius: 0, xMin: -45, xMax: 195, yMin: -45, yMax: 195 },
}




