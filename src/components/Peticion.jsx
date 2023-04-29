import { useState } from "react";


let globalAnswers = [];

export default function Peticion() {
  const [trivia, settrivia] = useState([]);
  const [cantidadPreguntas, setCantidadPreguntas] = useState(0);
  const [variedadPreguntas, setVariedadPreguntas] = useState("select");
  const [tipoRespuestas, setTipoRespuestas] = useState("select");
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [juegoComenzado, setJuegoComenzado] = useState(false);
  const [rtaActiva, setRtaActiva] = useState(false);

  let opcionesCantidad = [];
  for (let i = 0; i <= 50; i++) {
    opcionesCantidad.push(i);
  }

  const opcionesVariedad = {
    select: "Select",
    easy: "Fácil",
    medium: "Media",
    hard: "Difícil",
  };

  const opcionesTipo = {
    select: "Select",
    multiple: "Multiple",
    boolean: "Boolean",
  };
  const handleCantidadChange = (event) => {
    if (!juegoComenzado) {
      setCantidadPreguntas(event.target.value);
    }
  };

  const handleTipoChange = (event) => {
    if (!juegoComenzado) {
      setTipoRespuestas(event.target.value);
    }
  };

  const handleVariedadChange = (event) => {
    if (!juegoComenzado) {
      setVariedadPreguntas(event.target.value);
    }
  };

  const empezarJuego = () => {
    setJuegoComenzado(true);
    if (juegoComenzado) {
      fetch(
        `https://opentdb.com/api.php?amount=${cantidadPreguntas}&difficulty=${variedadPreguntas}&type=${tipoRespuestas}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log();
          settrivia(res.results);
        });
    }
  };

  const reiniciarJuego = () => {
    setRespuestasCorrectas(0);
    setJuegoComenzado(false);
    setCantidadPreguntas(0);
    setTipoRespuestas("select");
    setVariedadPreguntas("select");
    settrivia([]);
  };

  const handleRespuestaClick = (respuesta, pregunta, index) => {
    if (respuesta === pregunta.correct_answer) {
      setRtaActiva(true);
      setRespuestasCorrectas(respuestasCorrectas + 1);
    }
  };

  // const checkAnswer = ()
  return (
    <div className="div">
      <h1 className="div_h1">TRIVIA</h1>

      <h3 className="div_h3">Elige la cantidad de preguntas</h3>
      <select
        className="div_select"
        value={cantidadPreguntas}
        onChange={handleCantidadChange}
      >
        {opcionesCantidad.map((opcion, index) => (
          <option key={index} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

      <h3 className="div_h3">Elige la dificultad</h3>
      <select
        className="div_select"
        value={variedadPreguntas}
        onChange={handleVariedadChange}
      >
        {Object.keys(opcionesVariedad).map((opcion, index) => (
          <option key={index} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

      <h3 className="div_h3">Elige el tipo de respuesta</h3>
      <select
        className="div_select"
        value={tipoRespuestas}
        onChange={handleTipoChange}
      >
        {Object.keys(opcionesTipo).map((opcion, index) => (
          <option key={index} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

      <div className="botones">
        <h4>Preguntas: {cantidadPreguntas}</h4>
        <h4>Respuestas correctas: {respuestasCorrectas}</h4>
        <button className="button" onClick={() => empezarJuego()}>
          ¡Comienza a Jugar!
        </button>
        <button className="button" onClick={() => reiniciarJuego()}>
          Jugar nuevamente
        </button>
      </div>
      <div className="rtas">
        <h2>PREGUNTAS</h2>
        {trivia.map((pregunta, index) => {
          const opcionesRespuesta = [
            pregunta.correct_answer,
            ...pregunta.incorrect_answers,
          ];
          opcionesRespuesta.sort(() => Math.random() - 0.5);

          return (
            <div key={index}>
              <p>{pregunta.question}</p>
              {opcionesRespuesta.map((opcion, index) => (
                <button
                  className="button"
                  onClick={() => handleRespuestaClick(opcion, pregunta)}
                  key={index}
                  disabled={rtaActiva}
                >
                  {opcion}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
