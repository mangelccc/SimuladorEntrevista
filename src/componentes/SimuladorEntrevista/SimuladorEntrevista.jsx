import React, { useState } from "react";
import { obtenerDatos } from "./Conectividad_ChatGPT_API.js";
import Pregunta from "./Pregunta.jsx";
import SeleccionarPuesto from "./SeleccionarPuesto.jsx";
import Respuesta from "./Respuesta.jsx";
import "./SimuladorEntrevista.css";

const SimuladorEntrevista = () => {

  const valoresIniciales = {
    puesto: "",
    respuestaUsuario: "",
  };
  const valorInicial = "";

  const [datosFormulario, setDatosFormulario] = useState(valoresIniciales);
  const [preguntaGenerada, setPreguntaGenerada] = useState(valorInicial);
  const [respuestaEntrevistador, setRespuestaEntrevistador] = useState(valorInicial);
  const [error, setError] = useState(valorInicial);

  // Función para actualizar cualquier campo del formulario.
  const actualizarCampo = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  // Función para manejar la selección del puesto y obtener una pregunta.
  const manejarSeleccion = async () => {
    try {
      const pregunta = await obtenerDatos(datosFormulario.puesto);
      setPreguntaGenerada(pregunta);
    } catch (error) {
      setError("Error pregunta:" + error.message);
    }
  };

  // Función para manejar la respuesta del usuario y obtener respuestaChatgpt.
  const manejarRespuesta = async () => {
    try {
      const respuesta = await obtenerDatos(datosFormulario.puesto, datosFormulario.respuestaUsuario, true);
      setRespuestaEntrevistador(respuesta);
    } catch (error) {
      setError("Error respuesta:" + error.message);
    }
  };

  /*
  No usaste useEffect porque manejas las acciones 
  directamente con botones u otros eventos, en vez de que se ejecuten 
  automáticamente al cambiar el estado.
  */

  return (
    <>
      <SeleccionarPuesto
        datosFormulario={datosFormulario}
        actualizarCampo={actualizarCampo}
        manejarSeleccion={manejarSeleccion}
      />

      <div className="simulador-container">
   
        {error ? (
          error
        ) : preguntaGenerada ? (
          <>
            <Pregunta
              preguntaGenerada={preguntaGenerada}
              datosFormulario={datosFormulario}
              actualizarCampo={actualizarCampo}
              manejarRespuesta={manejarRespuesta}
            />
            <Respuesta respuestaEntrevistador={respuestaEntrevistador} />
          </>
        ) : (
          <p>Esperando pregunta...</p>
        )}

      </div>
    </>
  );
};

export default SimuladorEntrevista;
