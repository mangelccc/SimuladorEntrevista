import React from "react";

const Respuesta = ({ respuestaEntrevistador }) => {
  return (
    <div className="respuesta-entrevistador">
      <h3>Respuesta del Entrevistador:</h3>
      <p>{respuestaEntrevistador}</p>
    </div>
  );
};

export default Respuesta;
