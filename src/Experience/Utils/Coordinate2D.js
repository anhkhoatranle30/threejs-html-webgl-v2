export default class Coordinate2D {
  static calcSin2Points(originPoint, destinationPoint) {
    const deltaY = destinationPoint.y - originPoint.y;
    const deltaX = destinationPoint.x - originPoint.x;
    const hypotenuse = Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));

    const sin = deltaY / hypotenuse;
    return sin;
  }

  static findDirection(originPoint, destinationPoint) {
    const DIRECTIONS = {
      LEFT: 'left',
      RIGHT: 'right',
      TOP: 'top',
      BOTTOM: 'bottom',
      NONE: 'none',
    };

    const sinByXAxis = {
      start: Math.sin(-Math.PI * 0.25),
      end: Math.sin(Math.PI * 0.25),
    };

    const sin2Points = this.calcSin2Points(originPoint, destinationPoint);
    if (sin2Points >= sinByXAxis.start && sin2Points <= sinByXAxis.end) {
      const deltaX = destinationPoint.x - originPoint.x;
      if (deltaX > 0) {
        return DIRECTIONS.RIGHT;
      } else if (deltaX < 0) {
        return DIRECTIONS.LEFT;
      } else {
        return DIRECTIONS.NONE;
      }
    } else {
      const deltaY = destinationPoint.y - originPoint.y;
      if (deltaY > 0) {
        return DIRECTIONS.TOP;
      } else if (deltaY < 0) {
        return DIRECTIONS.BOTTOM;
      } else {
        return DIRECTIONS.NONE;
      }
    }
  }
}
