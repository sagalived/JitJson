import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    gerarLinhasChaves();
  }, []);

  // Função para gerar as linhas da tabela de chaves
  const gerarLinhasChaves = () => {
    return Object.keys(json.Portugues).map((chave) => (
      <tr key={chave}>
        <td>{chave.replace(/_/g, ' ')}</td>
      </tr>
    ));
  };

  // Função para gerar as linhas da tabela de valores de cada idioma
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

  // Função para adicionar uma nova chave em todos os idiomas
  const adicionarChave = () => {
    const novaChave = document.querySelector("#novaChave").value;
    const updatedJson = { ...json };

    Object.keys(updatedJson).forEach((idioma) => {
      updatedJson[idioma][novaChave] = "";
    });

    setJson(updatedJson);
  };

  // Função para adicionar um novo idioma com as chaves padrão
  const adicionarIdioma = () => {
    const novoIdioma = document.querySelector("#novoIdioma").value;
    const updatedJson = { ...json };
  
    updatedJson[novoIdioma] = {
      TITULO_CONSULTOR: "",
      FALE_CONSULTOR: "",
    };
  
    setJson(updatedJson);
  };

  // Função para salvar e exibir o JSON no console
  const handleSalvar = () => {
    console.log(json);
  };

  // Renderização do componente
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
            <input type="text" className="form-control" id="novaChave" placeholder="Nova Chave" />
            <button type="button" className="btn btn-primary" id="adicionarChave" onClick={adicionarChave}>
              Adicionar Chave
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <div className="row">
            {Object.entries(json).map(([idioma, data]) => (
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
            ))}
          </div>
        </div>
      </div>
      <div className="fixed-bottom-right">
        <input type="text" className="form-control" id="novoIdioma" placeholder="Novo Idioma" />
        <button type="button" className="btn btn-primary" id="adicionarIdioma" onClick={adicionarIdioma}>
          Adicionar Novo Idioma
        </button>
      </div>
      <button type="button" className="btn btn-success" id="salvar" onClick={handleSalvar}>
        Mostrar JSON
      </button>
    </div>
  );  
};

export default App;

            
