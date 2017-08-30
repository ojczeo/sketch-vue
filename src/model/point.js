
export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(otherPoint) {
    return new Point(
      this.x + otherPoint.x,
      this.y + otherPoint.y
    );
  }

  sub(otherPoint) {
    return new Point(
      this.x - otherPoint.x,
      this.y - otherPoint.y
    );
  }

  abs() {
    return new Point(
      Math.abs(this.x),
      Math.abs(this.y));
  }

}
