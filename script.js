const url = "https://raw.githubusercontent.com/MaidaCampazzo/TrabajoFinal/refs/heads/main/Goleadores.json";

const añoInicio = 1930;
const añoFin = 2025;
const añosTotales = añoFin - añoInicio;
const espacioSuperior = 20;

function nombreInvertido(nombreOriginal) {
  const partes = nombreOriginal.split(" ");
  if (partes.length < 2) return nombreOriginal;
  const apellido = partes[0];
  const nombre = partes.slice(1).join(" ");
  return `${nombre} ${apellido}`;
}

fetch(url)
  .then(res => res.json())
  .then(datos => {
    const cuerpoTabla = document.getElementById("top10-goleadores");


    const top10Partidos = [...datos]
      .sort((a, b) => (b.nacionales + b.internacionales) - (a.nacionales + a.internacionales))
      .slice(0, 10);

    const maxPartidos = Math.max(...top10Partidos.map(j => j.nacionales + j.internacionales));

    cuerpoTabla.innerHTML = "";

    top10Partidos.forEach(jugador => {
      const total = jugador.nacionales + jugador.internacionales;
      const largoNacionales = (jugador.nacionales / maxPartidos) * 500;
      const largoInternacionales = (jugador.internacionales / maxPartidos) * 500;

      const fila = document.createElement("tr");

      const tdNombre = document.createElement("td");
      tdNombre.textContent = nombreInvertido(jugador.nombre);

      const tdBarra = document.createElement("td");

      tdBarra.innerHTML = `
        <svg class="barra-svg" width="600" height="25">
          <rect x="0" y="0" width="${largoNacionales}" height="25" fill="#005BAC" rx="1"></rect>
          ${
            jugador.internacionales > 0
              ? `<rect x="${largoNacionales}" y="0" width="${largoInternacionales}" height="25" fill="#A3D3F9" rx="1"></rect>`
              : ``
          }
          <text x="10" y="17" font-size="12" fill="white">${jugador.nacionales}</text>
          ${
            jugador.internacionales > 0
              ? `<text x="${largoNacionales + largoInternacionales + 6}" y="17" font-size="12" fill="#a3d3f9">${jugador.internacionales}</text>`
              : ``
          }
        </svg>
      `;

      fila.appendChild(tdNombre);
      fila.appendChild(tdBarra);
      cuerpoTabla.appendChild(fila);
    });

    const contenedor = document.getElementById("lineaTiempo");

    const top5 = [...datos]
      .sort((a, b) => b.goles - a.goles)
      .slice(0, 5)
      .map(j => j.nombre);

    contenedor.innerHTML = "";

    datos.forEach((jugador, index) => {
      const bar = document.createElement("div");
      bar.classList.add("player-bar");

      if (top5.includes(jugador.nombre)) {
        bar.classList.add("top-scorer");
      }

      const inicio = jugador.debut - añoInicio;
      const duracion = jugador.termino - jugador.debut;
      const left = (inicio / añosTotales) * 100;
      let width = (duracion / añosTotales) * 100;
      const top = index * 38 + espacioSuperior;

      const texto = `${nombreInvertido(jugador.nombre)} (${jugador.goles})`;
      bar.textContent = texto;

      const medir = document.createElement("span");
      medir.style.visibility = "hidden";
      medir.style.position = "absolute";
      medir.style.whiteSpace = "nowrap";
      medir.style.fontSize = "0.8em";
      medir.style.fontFamily = "sans-serif";
      medir.textContent = texto;
      document.body.appendChild(medir);
      const anchoTextoPx = medir.offsetWidth + 20;
      document.body.removeChild(medir);

      const anchoContenedor = contenedor.offsetWidth;
      let widthPx = (width / 100) * anchoContenedor;

      if (widthPx < anchoTextoPx) {
        widthPx = anchoTextoPx;
        width = (widthPx / anchoContenedor) * 100;
      }

      bar.style.left = `${left}%`;
      bar.style.top = `${top}px`;
      bar.style.width = `${width}%`;

      contenedor.appendChild(bar);
    });

    contenedor.style.height = datos.length * 38 + espacioSuperior + "px";

    const etiquetas = document.getElementById("decadas");
    etiquetas.innerHTML = "";
    for (let año = añoInicio; año <= añoFin; año += 10) {
      const span = document.createElement("span");
      span.textContent = año;
      etiquetas.appendChild(span);
    }
  })
       async function datos() {
                const consulta = await fetch("https://raw.githubusercontent.com/MaidaCampazzo/TrabajoFinal/refs/heads/main/Goleadores.json");
                data = await consulta.json();
                console.log(data);
                }
            datos().catch((error) => console.error(error));
