import React from "react";

const Pregunta = ({ preguntaGenerada, datosFormulario, actualizarCampo, manejarRespuesta }) => {
  return (
    <div className="pregunta">
      <h3>Pregunta de entrevista:</h3>
      <p>{preguntaGenerada}</p>
      <textarea
        name="respuestaUsuario"
        value={datosFormulario.respuestaUsuario}
        onChange={actualizarCampo}
        placeholder="Escribe tu respuesta aquí..."
      />
      <button onClick={manejarRespuesta}>
        Obtener Respuesta
      </button>
    </div>
  );
};

export default Pregunta;
