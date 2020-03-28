import React from 'react';

import './global.css';
import Routes from './routes';

function App() {
  // <Header title="Semana OmniStack" /> // propriedades paramêtro no React
  // <Header>Contador: 0</Header> // propriedade por conteúdo

  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
