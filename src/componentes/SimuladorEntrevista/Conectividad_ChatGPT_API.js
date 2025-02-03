
import OpenAI from "openai";
const openai = new OpenAI({
  // La clave de API está en el archivo .env (según la documentación de OpenAI, nunca debe colocarse en el código fuente).
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true,
});

// Función para obtener y mostrar datos de OpenAI.
const obtenerDatos = (puesto, respuestaUsuario, respuestaChatgpt) => {
  // Crear el prompt según el tipo de respuesta.
  /*Esto no debería ser así, ya que debería personalizarse en el 
  propio chat para no usar tantos tokens, ya que tenemos tokens limitados.*/
  let prompt = "";
  if (respuestaChatgpt) {
    prompt = `Actúa como un entrevistador experimentado y exigente para el puesto de ${puesto}. Estoy practicando mis respuestas para una entrevista y acabo de responder a la siguiente pregunta: "${respuestaUsuario}". Analiza mi respuesta de forma crítica y constructiva, identificando tanto los puntos fuertes como las áreas en las que debo mejorar. Por favor, ofrece observaciones detalladas y sugerencias prácticas para perfeccionar mi desempeño. Sé directo, profesional y evita introducciones o comentarios genéricos.`;
  } else {
    prompt = `Actúa como un entrevistador profesional y riguroso para el puesto de ${puesto}. Estoy preparándome para una entrevista y necesito que me formules una pregunta desafiante y representativa que podría surgir en una entrevista real para este cargo. La pregunta debe ser original, clara y concisa, sin recurrir a introducciones o frases genéricas. Asegúrate de variar el enfoque y no repetir preguntas utilizadas anteriormente.`;
  }

  // Llamar a la API de OpenAI y manejar la respuesta.
  // El primer return devuelve la promesa de la llamada a la API de OpenAI para manejarla más tarde.
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
  })
  .then((respuesta) => {
    const respuestagpt = respuesta.choices[0].message.content.trim();
    // El segundo return devuelve la respuesta procesada de GPT después de que la promesa se resuelve con éxito.
    return respuestagpt; 
  })
  .catch((error) => {
    return `Error al obtener datos: ${error.message}`; 
  });
}

export { obtenerDatos };