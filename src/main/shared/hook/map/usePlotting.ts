function drawLine(ctx: CanvasRenderingContext2D, points: [number, number][], color: string) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.stroke();
}
function drawPolygon(ctx: CanvasRenderingContext2D, points: [number, number][], color: string) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.stroke();
}
function drawRectangle(ctx: CanvasRenderingContext2D, points: [number, number][], color: string) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(points[0][0], points[0][1]);
    ctx.lineTo(points[1][0], points[0][1]);
    ctx.lineTo(points[1][0], points[1][1]);
    ctx.lineTo(points[0][0], points[1][1]);
    ctx.closePath();
    ctx.stroke();
}

function drawCircle(ctx: CanvasRenderingContext2D, point: [number, number], color: string, radius: number) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(point[0], point[1], radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawMarker(ctx: CanvasRenderingContext2D, points: [number, number][], color: string) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(points[0][0], points[0][1], 5, 0, 2 * Math.PI);
    ctx.stroke();
}
/**通用绘制工具 */
export const DrawToolUtil = {
    drawLine,
    drawPolygon,
    drawRectangle,
    drawCircle,
    drawMarker
}