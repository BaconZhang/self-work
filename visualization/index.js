/**
 * 任意点到任意直线的距离
 * 点: (x0, y0)
 * 直线上两点: (x1, y1)、(x2, y2)
 */
const compute = (x0, y0, x1, y1, x2, y2) => {
  const cos = (x0 * (x2 - x1) + y0 * (y2 - y1)) / (Math.hypot(x0, y0) * Math.hypot(x2 - x1, y2 - y1))
  return Math.abs(Math.hypot(x0 , y0) * Math.sqrt(1 - cos * cos))
}