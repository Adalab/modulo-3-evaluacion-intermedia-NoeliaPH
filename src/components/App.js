import { useState, useEffect } from "react";
import adalabers from "../data/data.json";
import "../styles/App.scss";
import callToApi from '..//services/fetch.js';

function App() {

  useEffect (() =>{
    callToApi()
    .then(adalabers =>{
      setData(adalabers.results);
    });
  }, []);

  /*const adalabers(){
    function getAdalabers(){
  return fetch('https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json')
  .then(response => response.json())
  .then(adalabers => {
    setData(adalabers);
  });}

  const getAdalabers ={
    getAdalabers: getAdalabers
  };*/

  const [data, setData]=useState([]);
  const [name, setName]= useState('');
  const [counselor, setCounselor]= useState('');
  const [speciality, setSpeciality]= useState('');
  const htmlAdalabers = data.map((adalaber, id) => (
    <tr key= {id}>
      <td>{adalaber.name}</td>
      <td>{adalaber.counselor}</td>
      <td>{adalaber.speciality}</td>
    </tr>
  ));

  const handleChangeName = (ev) =>{
    setName(ev.currentTarget.value);
  };
  const handleChangeCounselor = (ev) =>{
    setCounselor(ev.currentTarget.value);
  };
  const handleChangeSpeciality = (ev) =>{
    setSpeciality(ev.currentTarget.value);
  };
  const handleClick = (ev) =>{
    ev.preventDefault();
    const newAdalaber ={
      name: name,
      counselor: counselor,
      speciality: speciality,
    };
    console.log(newAdalaber);
    setData([...data, newAdalaber]);
  
    setName('');
    setCounselor('');
    setSpeciality('');
  };

  console.log();
  return (
    <div>
      <h1>Lista de Adalabers</h1>
      <table>
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>TUTORA</th>
            <th>ESPECIALIDAD</th>
          </tr>
        </thead>
        <tbody>{htmlAdalabers}</tbody>
      </table>
      <h2>Añadir a una Adalaber</h2>
      <form >
      <input 
        type="text" 
        name="name" 
        placeholder="Escribe aquí tu nombre" 
        onChange={handleChangeName} 
        value={name}
      />
      <input 
        type="text" 
        name="counselor" 
        placeholder="¿Quién es tu tutora?" 
        onChange={handleChangeCounselor} 
        value={counselor}
      />
      <input
        type="text"
        name=" speciality"
        placeholder="¿Cuál es tu especialidad?"
        onChange={handleChangeSpeciality} value={speciality}
      />
      <input
        type="submit"
        value="Añadir"
        onClick={handleClick}
      />
      </form>
    </div>
  );
}

export default App;
