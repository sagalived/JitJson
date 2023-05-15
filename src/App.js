import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const App = () => {
  const [json, setJson] = useState({
    Portugues: {
      TITULO_CONSULTOR: "INTERCÂMBIO NO EXTERIOR",
      FALE_CONSULTOR: "Fale com o nosso time de especialistas para todo o Brasil! Para receber seu ORÇAMENTO!"
    },
    Ingles: {
      TITULO_CONSULTOR: "STUDY ABROAD",
      FALE_CONSULTOR: "Now talk to our team of specialists throughout Brazil! To receive your BUDGET!"
    },
    Espanhol: {
      TITULO_CONSULTOR: "INTERCAMBIO EN EL EXTRANJERO",
      FALE_CONSULTOR: "¡Hable ahora con nuestro equipo de especialistas en todo Brasil! ¡Para recibir su PRESUPUESTO!"
    }
  });
  const [idiomaSelecionado, setIdiomaSelecionado] = useState('');
  const [mostrarTodosIdiomas, setMostrarTodosIdiomas] = useState(true);
  const [chaveFiltro, setChaveFiltro] = useState('');


  const gerarLinhasChaves = useCallback(() => {
    const chavesFiltradas = Object.keys(json.Portugues).filter(chave =>
      chave.toLowerCase().includes(chaveFiltro.toLowerCase())
    );
  
    return chavesFiltradas.map((chave) => (
      <tr key={chave}>
        <td>{chave.replace(/_/g, ' ')}</td>
      </tr>
    ));
  }, [json.Portugues, chaveFiltro]);
  
  useEffect(() => {
    gerarLinhasChaves();
  }, [gerarLinhasChaves]);
  

  const gerarLinhasTabela = (idioma, data) => {
    return Object.entries(data).map(([chave, valor]) => (
      <tr key={chave}>
        <td>{chave.replace(/_/g, ' ')}</td>
        <td>
          {chave === 'FALE_CONSULTOR' ? (
            <textarea
              value={valor}
              onChange={(e) => handleValorChange(idioma, chave, e.target.value)}
              style={{ resize: 'vertical', minHeight: '100px' }}
            />
          ) : (
            <input
              type="text"
              value={valor}
              onChange={(e) => handleValorChange(idioma, chave, e.target.value)}
            />
          )}
        </td>
      </tr>
    ));
  };

  const handleValorChange = (idioma, chave, valor) => {
    const updatedJson = { ...json };
    updatedJson[idioma][chave] = valor;
    setJson(updatedJson);
  };

  const adicionarChave = () => {
    const novaChave = document.querySelector("#novaChave").value;
    if (novaChave.trim() === "") {
      alert("A nova chave não pode ser vazia.");
      return;
    }

    const updatedJson = { ...json };

    Object.keys(updatedJson).forEach((idioma) => {
      updatedJson[idioma][novaChave] = "";
    });

    setJson(updatedJson);
  };

  const adicionarIdioma = () => {
    const novoIdioma = document.querySelector("#novoIdioma").value;
    if (novoIdioma.trim() === "") {
      alert("O novo idioma não pode ser vazio.");
      return;
    }
  
    const updatedJson = { ...json };
  
    const chavesExistentes = Object.keys(updatedJson.Portugues);
  
    updatedJson[novoIdioma] = {};
    chavesExistentes.forEach((chave) => {
      updatedJson[novoIdioma][chave] = "";
    });
  
    setJson(updatedJson);
  };
  
  const handleSalvar = () => {
    console.log(json);
  };
  
  const handleFiltrarIdioma = (idioma) => {
    setIdiomaSelecionado(idioma);
  };
  
  const handleMostrarTodosIdiomas = () => {
    setMostrarTodosIdiomas(true);
    setIdiomaSelecionado('');
  };
  
  const renderizarIdiomaFiltrado = () => {
    if (idiomaSelecionado === '' && mostrarTodosIdiomas) {
      return Object.entries(json).map(([idioma, data]) => (
        <div className="col-md-4 tabela-container" key={idioma}>
          <h2>{idioma}</h2>
          <form>
            <table className="table">
              <thead>
                <tr>
                  <th>Chave</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>{gerarLinhasTabela(idioma, data)}</tbody>
            </table>
          </form>
        </div>
      ));
    } else {
      const data = json[idiomaSelecionado];
      return (
        <div className="col-md-4 tabela-container" key={idiomaSelecionado}>
          <h2>{idiomaSelecionado}</h2>
          <form>
            <table className="table">
              <thead>
                <tr>
                  <th>Chave</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>{gerarLinhasTabela(idiomaSelecionado, data)}</tbody>
            </table>
          </form>
        </div>
      );
    }
  };
  
  const handleFiltrarChave = (chave) => {
    setChaveFiltro(chave);
  };
  
  return (
    <div className="container">
      <h1>Formulário de Tradução</h1>
  
      <div className="row">
        <div className="col-md-4 tabela-container chaves">
          <h2>Chaves</h2>
          <form>
            <table className="table" id="chavesTable">
              <thead></thead>
              <tbody>{gerarLinhasChaves()}</tbody>
            </table>
            <input
              type="text"
              className="form-control"
              id="novaChave"
              placeholder="Nova Chave"
            />
            <button
              type="button"
              className="btn btn-primary"
              id="adicionarChave"
              onClick={adicionarChave}
            >
              Adicionar Chave
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12">
              <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="novoIdioma"
                placeholder="Novo Idioma"
              />
              <button
                type="button"
                className="btn btn-primary"
                id="adicionarIdioma"
                onClick={adicionarIdioma}
              >
                Adicionar Idioma
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por chave..."
                onChange={(e) => handleFiltrarChave(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleMostrarTodosIdiomas}
              >
                Mostrar Todos os Idiomas
              </button>
              {Object.keys(json).map((idioma) => (
                <button
                  type="button"
                  className="btn btn-secondary"
                  key={idioma}
                  onClick={() => handleFiltrarIdioma(idioma)}
                >
                  {idioma}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row">{renderizarIdiomaFiltrado()}</div>
        <div className="row">
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSalvar}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default App;
