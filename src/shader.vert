precision mediump float;
uniform float uTime;
varying vec2 vUv;
varying float vWave;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
void main() {
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 2.5;
    float noiseAmp = 0.25;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    pos.z += snoise3(noisePos) * noiseAmp;
    vWave = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}