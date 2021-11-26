export default class Calculator {
  static CalcDistanceTwoPoints({ source, destination, isEnalbled }) {
    const x2 = isEnalbled.x ? Math.pow(source.x - destination.x, 2) : 0;
    const y2 = isEnalbled.y ? Math.pow(source.y - destination.y, 2) : 0;
    const z2 = isEnalbled.z ? Math.pow(source.z - destination.z, 2) : 0;
    return Math.sqrt(x2 + y2 + z2);
  }
}
