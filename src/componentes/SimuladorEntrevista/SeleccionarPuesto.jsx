import React from "react";

const SeleccionarPuesto = ({ datosFormulario, actualizarCampo, manejarSeleccion }) => {
  return (
    <div id="selector">
      <h1>Simulador de Entrevistas</h1>
      <label>
        Selecciona un puesto:
        <select
          name="puesto"
          value={datosFormulario.puesto}
          onChange={actualizarCampo}
        >
          <option value="">Elige un puesto</option>
          <option value="Programador Backend">Programador Backend</option>
          <option value="Programador Frontend">Programador Frontend</option>
          <option value="Programador Full Stack">Programador Full Stack</option>
        </select>
      </label>
      <button onClick={manejarSeleccion}>
        Obtener Pregunta
      </button>
    </div>
  );
};

export default SeleccionarPuesto;
