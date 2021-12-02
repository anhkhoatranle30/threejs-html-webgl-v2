uniform float uSize;
uniform float uTime;

attribute float aScale;

void main()
{
  /**
    * Position
    */
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float distanceToCenter = length(modelPosition.xyz);
  modelPosition.x +=  5.0 * sin(uTime * 0.0005 + distanceToCenter);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  /**
    * Size
    */
  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / - viewPosition.z);
}