const e=document.querySelector("#particles-canvas"),t=e.getContext("webgl");t||alert("WebGL nie jest wspierany przez Twoją przeglądarkę."),e.width=window.innerWidth,e.height=window.innerHeight,t.viewport(0,0,e.width,e.height);const a={particleCount:5e3,textArray:["UltraPower","Super Moce"],mouseRadius:.1,particleSize:2,forceMultiplier:.001,returnSpeed:.005,velocityDamping:.95,colorMultiplier:4e4,saturationMultiplier:1e3,textChangeInterval:1e4,rotationForceMultiplier:.5};let r=0,i=[];const n={x:-500,y:-500,radius:a.mouseRadius},o=[];for(let e=0;e<a.particleCount;e++)o.push({x:0,y:0,baseX:0,baseY:0,vx:0,vy:0});const l=`
    attribute vec2 a_position; // Atrybut - pozycja cz\u{105}steczki
    attribute float a_hue; // Atrybut - hue (odcie\u{144}) koloru
    attribute float a_saturation; // Atrybut - nasycenie koloru
    varying float v_hue; // Zmienna wariacyjna - hue przekazywane do fragment shader'a
    varying float v_saturation; // Zmienna wariacyjna - nasycenie przekazywane do fragment shader'a
    void main() {
        gl_PointSize = ${a.particleSize.toFixed(1)}; // Ustawienie rozmiaru punktu (cz\u{105}steczki)
        gl_Position = vec4(a_position, 0.0, 1.0); // Ustawienie pozycji cz\u{105}steczki
        v_hue = a_hue; // Przekazanie hue do fragment shader'a
        v_saturation = a_saturation; // Przekazanie nasycenia do fragment shader'a
    }
`,u=`
    precision mediump float; // Ustawienie precyzji na \u{15B}redni\u{105}
    varying float v_hue; // Zmienna wariacyjna - hue otrzymane z vertex shader'a
    varying float v_saturation; // Zmienna wariacyjna - nasycenie otrzymane z vertex shader'a
    void main() {
        // Definicje kolor\xf3w (zielony i fioletowy)
        vec3 green = vec3(0.0, 1.0, 0.62); // #00FF9F - zielony
        vec3 purple = vec3(0.61, 0.0, 1.0); // #9D00FF - fioletowy

        // Mieszanie kolor\xf3w w zale\u{17C}no\u{15B}ci od v_hue (pr\u{119}dko\u{15B}ci)
        float mixValue = mod(v_hue, 1.0); // U\u{17C}ywamy mod, aby warto\u{15B}ci by\u{142}y mi\u{119}dzy 0 a 1
        vec3 color = mix(green, purple, mixValue); // Mieszanie zielonego i fioletowego

        // Mieszanie koloru z bia\u{142}ym w zale\u{17C}no\u{15B}ci od nasycenia
        vec3 finalColor = mix(vec3(1.0), color, v_saturation);
        gl_FragColor = vec4(finalColor, 1.0); // Ustawienie koloru fragmentu
    }
`;function c(e,t,a){let r=e.createShader(t);return(e.shaderSource(r,a),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))?r:(console.error(e.getShaderInfoLog(r)),e.deleteShader(r),null)}const h=c(t,t.VERTEX_SHADER,l),s=c(t,t.FRAGMENT_SHADER,u),d=function(e,t,a){let r=e.createProgram();return(e.attachShader(r,t),e.attachShader(r,a),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS))?r:(console.error(e.getProgramInfoLog(r)),e.deleteProgram(r),null)}(t,h,s),y=t.getAttribLocation(d,"a_position"),f=t.getAttribLocation(d,"a_hue"),g=t.getAttribLocation(d,"a_saturation"),v=t.createBuffer(),A=t.createBuffer(),m=t.createBuffer(),p=new Float32Array(2*a.particleCount),w=new Float32Array(a.particleCount),x=new Float32Array(a.particleCount);function b(t){let a=document.createElement("canvas").getContext("2d");a.canvas.width=e.width,a.canvas.height=e.height;let r=Math.min(e.width/6,e.height/6);a.font=`900 ${r}px Arial`,a.fillStyle="white",a.textAlign="center",a.textBaseline="middle",a.fillText(t,e.width/2,e.height/2);let i=a.getImageData(0,0,e.width,e.height).data,n=[];for(let t=0;t<e.height;t+=4)for(let a=0;a<e.width;a+=4)i[(t*e.width+a)*4+3]>128&&n.push({x:a/e.width*2-1,y:-(t/e.height*2)+1});return n}function M(){i=b(a.textArray[r]);for(let e=0;e<a.particleCount;e++){let t=Math.floor(Math.random()*i.length),{x:a,y:r}=i[t];o[e].x=o[e].baseX=a,o[e].y=o[e].baseY=r}}e.addEventListener("mousemove",t=>{n.x=t.clientX/e.width*2-1,n.y=-(t.clientY/e.height*2)+1}),e.addEventListener("mouseleave",()=>{n.x=-500,n.y=-500}),window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,t.viewport(0,0,e.width,e.height),M()}),t.clearColor(0,0,0,1),M(),function e(){(function(){for(let e=0;e<a.particleCount;e++){let t=o[e],r=n.x-t.x,i=n.y-t.y,l=Math.sqrt(r*r+i*i),u=r/l,c=i/l,h=n.radius,s=(h-l)/h,d=u*s*a.forceMultiplier,y=c*s*a.forceMultiplier,f=Math.atan2(i,r),g=Math.sin(-Math.cos(-1*f)*Math.sin(a.rotationForceMultiplier*Math.cos(s))*Math.sin(l*l)*Math.sin(f*l)),v=Math.sin(Math.cos(+f)*Math.sin(a.rotationForceMultiplier*Math.sin(s))*Math.sin(l*l)*Math.cos(f*l));l<n.radius?(t.vx-=d+g,t.vy-=y+v):(t.vx+=(t.baseX-t.x)*a.returnSpeed,t.vy+=(t.baseY-t.y)*a.returnSpeed),t.x+=t.vx,t.y+=t.vy,t.vx*=a.velocityDamping,t.vy*=a.velocityDamping;let A=Math.sqrt(t.vx*t.vx+t.vy*t.vy),m=A*a.colorMultiplier%360;w[e]=m/360,x[e]=Math.min(A*a.saturationMultiplier,1),p[2*e]=t.x,p[2*e+1]=t.y}t.bindBuffer(t.ARRAY_BUFFER,v),t.bufferData(t.ARRAY_BUFFER,p,t.DYNAMIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,A),t.bufferData(t.ARRAY_BUFFER,w,t.DYNAMIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,m),t.bufferData(t.ARRAY_BUFFER,x,t.DYNAMIC_DRAW)})(),t.clear(t.COLOR_BUFFER_BIT),t.bindBuffer(t.ARRAY_BUFFER,v),t.vertexAttribPointer(y,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(y),t.bindBuffer(t.ARRAY_BUFFER,A),t.vertexAttribPointer(f,1,t.FLOAT,!1,0,0),t.enableVertexAttribArray(f),t.bindBuffer(t.ARRAY_BUFFER,m),t.vertexAttribPointer(g,1,t.FLOAT,!1,0,0),t.enableVertexAttribArray(g),t.useProgram(d),t.drawArrays(t.POINTS,0,a.particleCount),requestAnimationFrame(e)}(),setTimeout(function e(){r=(r+1)%a.textArray.length;let t=b(a.textArray[r]);for(let e=0;e<a.particleCount;e++){let a=Math.floor(Math.random()*t.length),{x:r,y:i}=t[a];o[e].baseX=r,o[e].baseY=i}setTimeout(e,a.textChangeInterval)},a.textChangeInterval);
//# sourceMappingURL=index.8c01476a.js.map
