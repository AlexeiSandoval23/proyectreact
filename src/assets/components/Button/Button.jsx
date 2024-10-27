import React, { useState } from 'react';

const ButtonCounter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

// handleClick
// handleReset boton para reiniciar el contador

  return (
    <div>
      <button onClick={handleClick}>Presiona el botón</button>
      <button onClick={handleReset}>Reiniciar contador</button>
      <p>Gracias por presionar el botón {count} veces.</p>
    </div>
  );
};

export default ButtonCounter;
