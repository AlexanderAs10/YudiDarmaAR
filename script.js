const slider = document.getElementById("zSlider");
const zValue = document.getElementById("zValue");
const result = document.getElementById("result");
const alphaSelect = document.getElementById("alphaSelect");
const zDisplay = document.getElementById("zDisplay");
const zTable = document.getElementById("zTable");
const testType = document.getElementById("testType");
const viewMode = document.getElementById("viewMode");

// =========================
// DISTRIBUSI NORMAL
// =========================

function normalDistribution(x) {

  return (
    (1 / Math.sqrt(2 * Math.PI)) *
    Math.exp(-0.5 * x * x)
  );

}

// =========================
// GENERATE CURVE
// =========================

function generateCurve() {

  let zCritical = parseFloat(alphaSelect.value);

  let mode = testType.value;

  let currentView = viewMode.value;

  let z = parseFloat(slider.value);

  zValue.innerText = z.toFixed(2);

  zDisplay.innerText = z.toFixed(2);

  zTable.innerText = zCritical;

  let x = [];
  let y = [];

  for(let i = -4; i <= 4; i += 0.1){

    x.push(i);

    y.push(normalDistribution(i));

  }

  // ==================================================
  // MODE 2D
  // ==================================================

  if(currentView === "2d"){

    let curve = {

      x: x,

      y: y,

      type: 'scatter',

      mode: 'lines',

      name: 'Kurva Normal',

      line: {
        color: '#38bdf8',
        width: 5
      }

    };

    let point = {

      x: [z],

      y: [normalDistribution(z)],

      mode: 'markers+text',

      type: 'scatter',

      text: [`Z = ${z.toFixed(2)}`],

      textposition: 'top center',

      marker: {
        color: '#ef4444',
        size: 14
      }

    };

    let criticalAreas = [];

    // =========================
    // UJI KANAN
    // =========================

    if(mode === "right"){

      let criticalX = [];
      let criticalY = [];

      for(let i = zCritical; i <= 4; i += 0.1){

        criticalX.push(i);

        criticalY.push(normalDistribution(i));

      }

      criticalAreas.push({

        x: criticalX,

        y: criticalY,

        fill: 'tozeroy',

        type: 'scatter',

        mode: 'lines',

        fillcolor: 'rgba(239,68,68,0.4)',

        line: {
          color: 'rgba(0,0,0,0)'
        }

      });

    }

    // =========================
    // UJI KIRI
    // =========================

    if(mode === "left"){

      let criticalX = [];
      let criticalY = [];

      for(let i = -4; i <= -zCritical; i += 0.1){

        criticalX.push(i);

        criticalY.push(normalDistribution(i));

      }

      criticalAreas.push({

        x: criticalX,

        y: criticalY,

        fill: 'tozeroy',

        type: 'scatter',

        mode: 'lines',

        fillcolor: 'rgba(239,68,68,0.4)',

        line: {
          color: 'rgba(0,0,0,0)'
        }

      });

    }

    // =========================
    // UJI DUA EKOR
    // =========================

    if(mode === "two"){

      // kiri
      let leftX = [];
      let leftY = [];

      for(let i = -4; i <= -zCritical; i += 0.1){

        leftX.push(i);

        leftY.push(normalDistribution(i));

      }

      criticalAreas.push({

        x: leftX,

        y: leftY,

        fill: 'tozeroy',

        type: 'scatter',

        mode: 'lines',

        fillcolor: 'rgba(239,68,68,0.4)',

        line: {
          color: 'rgba(0,0,0,0)'
        }

      });

      // kanan
      let rightX = [];
      let rightY = [];

      for(let i = zCritical; i <= 4; i += 0.1){

        rightX.push(i);

        rightY.push(normalDistribution(i));

      }

      criticalAreas.push({

        x: rightX,

        y: rightY,

        fill: 'tozeroy',

        type: 'scatter',

        mode: 'lines',

        fillcolor: 'rgba(239,68,68,0.4)',

        line: {
          color: 'rgba(0,0,0,0)'
        }

      });

    }

    Plotly.newPlot(

      'chart',

      [curve, ...criticalAreas, point],

      {

        title:'Kurva Distribusi Normal 2D',

        paper_bgcolor:'rgba(0,0,0,0)',

        plot_bgcolor:'rgba(0,0,0,0)',

        font:{
          color:'white'
        }

      },

      {
        responsive:true
      }

    );

  }

  // ==================================================
  // MODE 3D
  // ==================================================

  if(currentView === "3d"){

    let zAxis = [];

    for(let i = 0; i <= 1; i += 0.1){

      zAxis.push(i);

    }

    let surfaceZ = [];

    for(let i = 0; i < zAxis.length; i++){

      let row = [];

      for(let j = 0; j < x.length; j++){

        row.push(normalDistribution(x[j]));

      }

      surfaceZ.push(row);

    }

    // =========================
    // SURFACE 3D
    // =========================

    let surface = {

      z: surfaceZ,

      x: x,

      y: zAxis,

      type: 'surface',

      colorscale: 'Viridis',

      contours: {

        z: {

          show:true,

          usecolormap:true,

          highlightcolor:"#42f5ef",

          project:{z:true}

        }

      },

      lighting: {

        ambient:0.8,

        diffuse:1,

        roughness:0.4,

        specular:0.9

      },

      lightposition: {

        x:100,

        y:200,

        z:300

      }

    };

    // =========================
    // TITIK Z
    // =========================

    let point3D = {

      x:[z],

      y:[0.5],

      z:[normalDistribution(z)],

      mode:'markers+text',

      type:'scatter3d',

      text:[`Z=${z.toFixed(2)}`],

      textposition:'top center',

      marker:{
        color:'#ff0000',
        size:10
      }

    };

    Plotly.newPlot(

      'chart',

      [surface, point3D],

      {

        title:'Kurva Distribusi Normal 3D',

        paper_bgcolor:'rgba(0,0,0,0)',

        font:{
          color:'white'
        },

        scene:{

          aspectratio:{
            x:2,
            y:1,
            z:1
          },

          camera:{

            eye:{
              x:2.2,
              y:2,
              z:1.5
            }

          },

          xaxis:{

            title:'Nilai Z',

            backgroundcolor:'rgb(20,20,20)',

            gridcolor:'white',

            showbackground:true,

            zerolinecolor:'white',

            color:'white'

          },

          yaxis:{

            title:'Depth',

            backgroundcolor:'rgb(30,30,30)',

            gridcolor:'white',

            showbackground:true,

            zerolinecolor:'white',

            color:'white'

          },

          zaxis:{

            title:'Probabilitas',

            backgroundcolor:'rgb(40,40,40)',

            gridcolor:'white',

            showbackground:true,

            zerolinecolor:'white',

            color:'white'

          }

        }

      },

      {
        responsive:true
      }

    );

  }

  // ==================================================
  // LOGIKA H0
  // ==================================================

  let reject = false;

  if(mode === "right"){

    reject = z > zCritical;

  }

  if(mode === "left"){

    reject = z < -zCritical;

  }

  if(mode === "two"){

    reject = z > zCritical || z < -zCritical;

  }

  if(reject){

    result.innerHTML = `

      <span style="color:#ef4444;">
        H0 Ditolak
      </span>

      <br>

      <small>
        Nilai Z masuk daerah kritis
      </small>

    `;

  }else{

    result.innerHTML = `

      <span style="color:#22c55e;">
        H0 Diterima
      </span>

      <br>

      <small>
        Nilai Z tidak masuk daerah kritis
      </small>

    `;

  }

}

// =========================
// EVENTS
// =========================

slider.addEventListener(
  "input",
  generateCurve
);

alphaSelect.addEventListener(
  "change",
  generateCurve
);

testType.addEventListener(
  "change",
  generateCurve
);

viewMode.addEventListener(
  "change",
  generateCurve
);

// =========================
// LOAD AWAL
// =========================

generateCurve();