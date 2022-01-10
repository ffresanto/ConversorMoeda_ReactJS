import "./App.css";
import ConversorInput from "./components/ConversorInput";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [quantidade1, setQuantidade1] = useState(1);
  const [moeda1, setMoeda1] = useState('USD');
  const [quantidade2, setQuantidade2] = useState(1);
  const [moeda2, setMoeda2] = useState('BRL');
  
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get('http://data.fixer.io/api/latest?access_key=fe3f5327db2a2aa9c40317420c814a77&format=1')
      .then(response => {
        setRates(response.data.rates)
    })
  }, [])

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleQuantidade1Change(1);
      }
      init();
    }
  }, [rates])

  function formatar(numero) {
    return numero.toFixed(4)
  }

  function handleQuantidade1Change(quantidade1) {
    setQuantidade2(formatar(quantidade1 * rates[moeda2] / rates[moeda1]));
    setQuantidade1(quantidade1);
  }

  function handleMoeda1Change(moeda1) {
    setQuantidade2(formatar(quantidade1 * rates[moeda2] / rates[moeda1]));
    setMoeda1(moeda1);
  }

    function handleQuantidade2Change(quantidade2) {
    setQuantidade1(formatar(quantidade2 * rates[moeda1] / rates[moeda2]));
    setQuantidade1(quantidade2);
  }

  function handleMoeda2Change(moeda2) {
    setQuantidade2(formatar(quantidade2 * rates[moeda1] / rates[moeda2]));
    setMoeda2(moeda2);
  }

  return <div>
    <h1>Conversor de Moeda</h1>
    <ConversorInput onQuantidadeChange={handleQuantidade1Change} onMoedaChange={handleMoeda1Change} moedas={Object.keys(rates)} quantidade={quantidade1} moeda={moeda1}/>
    <ConversorInput onQuantidadeChange={handleQuantidade2Change} onMoedaChange={handleMoeda2Change} moedas={Object.keys(rates)} quantidade={quantidade2} moeda={moeda2}/>
  </div>;
}

export default App;
