uniform float uDelta;
uniform float uVorticity;
// Example Pixel Shader
vec2 pL = vec2(vUV.x - 1.0 * uTD2DInfos[0].res.x, vUV.y);
vec2 pR = vec2(vUV.x + 1.0 * uTD2DInfos[0].res.x, vUV.y);
vec2 pT = vec2(vUV.x, vUV.y + 1.0 * uTD2DInfos[0].res.y);
vec2 pB = vec2(vUV.x, vUV.y - 1.0 * uTD2DInfos[0].res.y);
// uniform float exampleUniform;

out vec4 fragColor;
void main()
{
    // vec4 color = texture(sTD2DInputs[0], vUV.st);
    float L = texture(sTD2DInputs[1], pL).x;
    float R = texture(sTD2DInputs[1], pR).x;
    float T = texture(sTD2DInputs[1], pT).x;
    float B = texture(sTD2DInputs[1], pB).x;
    float C = texture(sTD2DInputs[1], vUV.xy).x;
    
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= uVorticity * C;
    force.y *= -1.0;
    
    vec2 vel = texture(sTD2DInputs[0],vUV.xy).xy;
    
    vec4 color = vec4(vel + force * uDelta,0.0,1.0);
    fragColor = TDOutputSwizzle(color);
}

