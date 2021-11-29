uniform vec3 uOffset;

void main()
{
  vec3 newPosition = vec3(position.x + uOffset.x, 
                          position.y + uOffset.y, 
                          position.z + uOffset.z);
  gl_Position = vec4(newPosition, 1.0);
}