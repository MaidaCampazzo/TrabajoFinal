const url = "https://raw.githubusercontent.com/MaidaCampazzo/TrabajoFinal/refs/heads/main/Goleadores.json";

const añoInicio = 1930;
const añoFin = 2025;
const añosTotales = añoFin - añoInicio;
const espacioSuperior = 20;

fetch(url)
  .then(res => res.json())
  .then(datos => {
    const contenedor = document.getElementById("lineaTiempo");

    const top5 = [...datos]
      .sort((a, b) => b.goles - a.goles)
      .slice(0, 5)
      .map(j => j.nombre);

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

      const texto = `${jugador.nombre} (${jugador.goles})`;
      bar.textContent = texto;

      // Crear elemento invisible para medir texto
      const medir = document.createElement("span");
      medir.style.visibility = "hidden";
      medir.style.position = "absolute";
      medir.style.whiteSpace = "nowrap";
      medir.style.fontSize = "0.8em";
      medir.style.fontFamily = "sans-serif";
      medir.textContent = texto;
      document.body.appendChild(medir);
      const anchoTextoPx = medir.offsetWidth + 20; // + padding
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
    for (let año = añoInicio; año <= añoFin; año += 10) {
      const span = document.createElement("span");
      span.textContent = año;
      etiquetas.appendChild(span);
    }
  })
  .catch(error => console.error(error));
