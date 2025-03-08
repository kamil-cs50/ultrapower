export default `
  //
  // GLSL textureless classic 3D noise "cnoise",
  // z wariantem periodycznym w stylu RSL "pnoise".
  // Autor:  Stefan Gustavson (stefan.gustavson@liu.se)
  // Wersja: 2011-10-11
  //
  // Wielkie dzięki dla Iana McEwana z Ashima Arts za
  // pomysły na permutację i wybór gradientu.
  //
  // Copyright (c) 2011 Stefan Gustavson. Wszelkie prawa zastrzeżone.
  // Rozpowszechniane na licencji MIT. Zobacz plik LICENSE.
  // https://github.com/ashima/webgl-noise
  //

  // Funkcja pomocnicza do operacji modulo na wektorach 3D z zakresem 289.0
  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  // Funkcja pomocnicza do operacji modulo na wektorach 4D z zakresem 289.0
  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  // Funkcja permutacji - część algorytmu szumu Perlin
  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }

  // Funkcja przybliżająca odwrotność pierwiastka kwadratowego - szybka normalizacja
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  // Funkcja fade - wygładzanie wartości dla lepszej interpolacji
  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  // Klasyczny szum Perlin w 3D
  float cnoise(vec3 P)
  {
    vec3 Pi0 = floor(P); // Część całkowita współrzędnych punktu
    vec3 Pi1 = Pi0 + vec3(1.0); // Część całkowita + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Część ułamkowa współrzędnych punktu
    vec3 Pf1 = Pf0 - vec3(1.0); // Część ułamkowa - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    // Gradienty bazowe w 12 kierunkach
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    // Normalizacja gradientów
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    // Iloczyny skalarne gradientów i wektorów odległości
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    // Interpolacja trójliniowa
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz; // Skalowanie wyniku
  }

  // Jednolity czas, animowany z zewnątrz
  uniform float u_time;
  // Jednolita prędkość animacji, ustawiana z zewnątrz
  uniform float u_speed;
  // Jednolita intensywność efektu, ustawiana z zewnątrz
  uniform float u_intensity;
  // Jednolity rozmiar cząsteczek, ustawiany z zewnątrz
  uniform float u_partical_size;
  // Jednolity kolor A, ustawiany z zewnątrz (nieużywany w tym shaderze)
  uniform vec3 u_color_a;
  // Zmienna wariacyjna UV, przekazywana do fragment shader'a
  varying vec2 v_uv;
  // Zmienna wariacyjna przemieszczenia, przekazywana do fragment shader'a
  varying float v_displacement;

  void main() {
    v_uv = uv; // Przekazanie współrzędnych UV
    // Obliczenie przemieszczenia na podstawie szumu Perlin
    v_displacement = cnoise(position + vec3(u_time * u_speed));
    // Skalowanie przemieszczenia intensywnością
    v_displacement = v_displacement * u_intensity;
    // Zastosowanie przemieszczenia do pozycji
    vec3 pos = position + (v_displacement);
    // Transformacja pozycji przez macierz modelu
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    // Transformacja pozycji przez macierz widoku
    vec4 viewPosition = viewMatrix * modelPosition;
    // Transformacja pozycji przez macierz projekcji
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition; // Ustawienie końcowej pozycji w przestrzeni projekcji
    // Ustawienie rozmiaru punktu, uwzględniając perspektywę (odległość od kamery)
    gl_PointSize = u_partical_size * (1.0 / - viewPosition.z);
  }
`;
