import React from 'react';

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Title</h1>
          <div className="form-field">
            <p>Clique no botão 'Adicionar' para adicionar o arquivo texto a ser lido</p>
            <button>Adicionar</button>
          </div>
        </header>
        <main>
          <div className="input">
            <h2>Input</h2>
            <div className="text-box">
              <p>Logica Matematica Media C</p>
              <p>Engenharia de Software Prova1 A</p>
              <p>Engenharia de Software Prova2 B</p>
              <p>Banco de Dados Media B</p>
              <p>Teoria da Computacao Prova1 F</p>
              <p>Teoria da Computacao Prova2 D</p>
              <p>qual a média em pontuacao brasileira de Logica Matematica?</p>
              <p>voce foi aprovado em Engenharia de Software ?</p>
              <p>qual a media da disciplina de Teoria da computacao?</p>
              <p>voce foi aprovado em todas as disciplinas?</p>
              <p>quantos creditos você cursou neste semestre?</p>
              <p>quantos creditos você concluiu?</p>
            </div>
          </div>
          <div className="output">
            <h2>Output</h2>
            <div className="text-box">
            <p>Logica Matematica Media C</p>
              <p>Engenharia de Software Prova1 A</p>
              <p>Engenharia de Software Prova2 B</p>
              <p>Banco de Dados Media B</p>
              <p>Teoria da Computacao Prova1 F</p>
              <p>Teoria da Computacao Prova2 D</p>
              <p>qual a média em pontuacao brasileira de Logica Matematica?</p>
              <p>voce foi aprovado em Engenharia de Software ?</p>
              <p>qual a media da disciplina de Teoria da computacao?</p>
              <p>voce foi aprovado em todas as disciplinas?</p>
              <p>quantos creditos você cursou neste semestre?</p>
              <p>quantos creditos você concluiu?</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default App;
