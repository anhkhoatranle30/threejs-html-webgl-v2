void main()
{
  vec3 newPosition = vec3(position.x, position.y + 0.2, position.z);
  gl_Position = vec4(newPosition, 1.0);
}