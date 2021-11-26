precision mediump float;

uniform float uThickness;
uniform float uDensity;

varying vec2 vUv;

#define M_PI 3.1415926535897932384626433832795

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
  // float strength = vUv.x;
  // float strength = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
  // strength += step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0)) * step(0.4, mod(vUv.x * 10.0, 1.0));

  // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // float strength = step(0.2, abs(vUv.x - 0.5)) + step(0.2, abs(vUv.y - 0.5));

  // float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;

  // float strength = random(vUv);
  float thickness = 1.0 - uThickness;
  float offset = thickness * 0.5;
  float xPattern = step(thickness, mod(vUv.x * uDensity - offset, 1.0));
  float yPattern = step(thickness, mod(vUv.y * uDensity - offset, 1.0));
  float strength = xPattern + yPattern;

  gl_FragColor = vec4(vec3(strength), 1.0);
}