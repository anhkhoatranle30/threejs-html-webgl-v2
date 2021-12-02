export default class Calculator {
  static CalcDistanceTwoPoints({ source, destination, isEnabled }) {
    const x2 = isEnabled.x ? Math.pow(source.x - destination.x, 2) : 0;
    const y2 = isEnabled.y ? Math.pow(source.y - destination.y, 2) : 0;
    const z2 = isEnabled.z ? Math.pow(source.z - destination.z, 2) : 0;
    return Math.sqrt(x2 + y2 + z2);
  }
}
