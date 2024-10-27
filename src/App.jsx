import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './assets/components/Button/Button'
import NavBar from './assets/components/Navbar/navbar'
import ItemListContainer from './assets/components/ItemListContainer/ItemListContainer'

function App() {
  return (
    <div>
      <NavBar />
      <ItemListContainer greeting="¡Proyecto React Js!" />
      <Button />
    </div>
  );
}

export default App
