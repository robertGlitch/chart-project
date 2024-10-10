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
