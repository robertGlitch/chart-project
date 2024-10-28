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

export const flightStyles = {
  pointStyle: 'rectRot',
  pointRadius: 6,
  pointHoverRadius: 6,
  borderColor: '#bbcff0',
  pointHoverBorderColor: '#bbcff0',
  borderWidth: 2,
  pointHoverBorderWidth: 2
}

export const tooltipStyles = {
  displayColors: false,
}


const cityAnnotationStyle = {
  type: 'label',
  color: '#7064f5',
  borderRadius: 0,
  borderWidth: 0,
  callout: {
    display: true
  },
  font: {
    size: 16
  }
};

const radarAnnotationStyle = {
  type: 'point',
  borderColor: '#009900',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  borderWidth: 1,
};





export const annotations: any = {
  'city1': { ...cityAnnotationStyle, content: 'ZAG', xValue: 640, yValue: 350 },
  'city2': { ...cityAnnotationStyle, content: 'LIN', xValue: 100, yValue: 350 },
  'city3': { ...cityAnnotationStyle, content: 'BLQ', xValue: 400, yValue: 126 },
  'city4': { ...cityAnnotationStyle, content: 'LJU', xValue: 510, yValue: 400 },
  'city5': { ...cityAnnotationStyle, content: 'VCE', xValue: 270, yValue: 450 },
  'city6': { ...cityAnnotationStyle, content: 'RJK', xValue: 500, yValue: 310 },
  'radar1': { ...radarAnnotationStyle, radius: 0, xMin: 250, xMax: 450, yMin: 250, yMax: 450 },
  'radar2': { ...radarAnnotationStyle, radius: 0, xMin: 150, xMax: 550, yMin: 150, yMax: 550 },
  'radar3': { ...radarAnnotationStyle, radius: 0, xMin: 50, xMax: 650, yMin: 50, yMax: 650 },
  'radar4': { ...radarAnnotationStyle, radius: 0, xMin: -100, xMax: 750, yMin: -100, yMax: 750 },
}



