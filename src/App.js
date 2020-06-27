import React, { useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repository, setRepository] = useState([])
  useEffect(() => {
    api.get('repositories').then(res => {
      setRepository(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Repositorie ${Date.now()}`,
      techs: "Node",
    });
    const repo = response.data;
    setRepository([...repository, repo]);
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`);
      setRepository(repository.filter(repo => repo.id !== id));
    } catch (err){
        alert('Erro ao deletar repositorio, tente novamente');
    }
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repo => <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
