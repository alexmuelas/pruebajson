<template>
  <div id="app">
    <form @submit.prevent="guardarPuntuacion">
      <label for="nombre">Nombre:</label>
      <input type="text" v-model="nombre" required />

      <label for="puntuacion">Puntuación:</label>
      <input type="number" v-model="puntuacion" required />

      <button type="submit">Guardar</button>
    </form>
    <h2>Puntuaciones Guardadas</h2>
    <table border="1">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Puntuación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(puntuacion, index) in puntuaciones" :key="index">
          <td>{{ puntuacion.nombre }}</td>
          <td>{{ puntuacion.puntuacion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nombre: "",
      puntuacion: "",
      puntuaciones: [],
    };
  },

  mounted() {
    this.leerPuntuaciones();
  },
  methods: {
    guardarPuntuacion() {
      // Verificar si localStorage es compatible con el navegador
      if (typeof Storage !== "undefined") {
        // Obtener los datos actuales del localStorage
        const puntuacionesGuardadas =
          JSON.parse(localStorage.getItem("puntuaciones")) || [];

        // Agregar la nueva puntuación
        puntuacionesGuardadas.push({
          nombre: this.nombre,
          puntuacion: this.puntuacion,
        });

        // Guardar en localStorage
        localStorage.setItem(
          "puntuaciones",
          JSON.stringify(puntuacionesGuardadas)
        );

        // Limpiar los campos del formulario
        this.nombre = "";
        this.puntuacion = "";

        alert("Puntuación guardada correctamente.");
      } else {
        alert("Lo siento, tu navegador no soporta localStorage.");
      }
    },
    leerPuntuaciones() {
      const puntuacionesGuardadas =
        JSON.parse(localStorage.getItem("puntuaciones")) || [];
      this.puntuaciones = puntuacionesGuardadas;
    },
  },
};
</script>

<style>
/* Estilos opcionales para el componente */
</style>
