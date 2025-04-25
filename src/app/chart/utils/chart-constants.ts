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


export const scalesConfig = {
  x: {
    min: 0,
    max: 150,
    ticks: {
      count: 7,
      align: 'inner',
      font: {
        weight: 'bold',
        size: 16
      }

    }
  },
  y: {
    min: 0,
    max: 150,
    ticks: {
      count: 7,
      font: {
        weight: 'bold',
        size: 16
      }
    }
  }
}

export const tooltipStyles = {
  displayColors: false,
  backgroundColor: '#f5e642',
  bodyColor: '#000000',
  bodyFont: {
    size: 20
  }
}


export const aircraftStyles = {
  pointStyle: (ctx: any) => {
    return ctx.raw?.id ? 'rectRot' : 'triangle'
  },
  pointRadius: 10,
  pointHoverRadius: 10,
  borderColor: (ctx: any) => {
    return ctx.raw?.id ? '#bbcff0' : '#cc0202'
  },
  pointHoverBorderColor: (ctx: any) => {
    return ctx.raw?.id ? '#bbcff0' : '#cc0202'
  },
  borderWidth: 3,
  pointHoverBorderWidth: 3,

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

export const missleStyles = {
  pointStyle: 'star',
  pointRadius: 8,
  pointHoverRadius: 8,
  borderColor: '#f7f752',
  pointHoverBorderColor: '#f7f752',
  borderWidth: 3,
  pointHoverBorderWidth: 3,
}


const cityAnnotationStyle = {
  type: 'label',
  color: '#7064f5',
  borderRadius: 0,
  borderWidth: 0,
  drawTime: 'beforeDatasetsDraw',
  font: {
    size: 20,
    weight: 'bold'
  }
};

const radarAnnotationStyle = {
  type: 'point',
  borderColor: '#009900',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  borderWidth: 1,
  drawTime: 'beforeDatasetsDraw'
};

export const samAnnotationStyle = {
  xValue: 70,
  yValue: 70,
  type: 'point',
  pointStyle: 'cross',
  borderColor: '#f7f752',
  backgroundColor: 'transparent',
  borderWidth: 3,
  radius: 15,
  drawTime: 'beforeDatasetsDraw'
};

export const samRadiusAnnotationStyle = {
  radius: 0,
  xMin: 20,
  xMax: 120,
  yMin: 20,
  yMax: 120,
  type: 'point',
  borderColor: '#f7f752',
  backgroundColor: 'transparent',
  borderWidth: 2,
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




