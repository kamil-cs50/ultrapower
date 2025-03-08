export default `
  // Jednolity czas, aktualizowany z zewnątrz
  uniform float u_time;
  // Jednolity kolor A, ustawiany z zewnątrz
  uniform vec3 u_color_a;
  // Jednolity kolor B, ustawiany z zewnątrz
  uniform vec3 u_color_b;
  // Zmienna wariacyjna UV, przekazywana z vertex shader'a
  varying vec2 v_uv;
  // Zmienna wariacyjna przemieszczenia, przekazywana z vertex shader'a
  varying float v_displacement;

  void main() {
    // Oblicz odległość od środka punktu
    float strength = distance(gl_PointCoord, vec2(0.5));
    // Ustaw siłę na 1.0 wewnątrz okręgu o promieniu 0.5, 0.0 na zewnątrz
    strength = step(0.5, strength);
    // Odwróć siłę, aby środek był mocniejszy
    strength = 1.0 - strength;

    // Interpoluj kolor między u_color_a i u_color_b na podstawie przemieszczenia
    vec3 color = mix(u_color_a, u_color_b, v_displacement);
    // Wymieszaj obliczony kolor z czarnym, używając siły jako współczynnika
    color = mix(vec3(0.0), color, strength);
    // Ustaw kolor fragmentu
    gl_FragColor = vec4(color, 1.0);
  }
`;
