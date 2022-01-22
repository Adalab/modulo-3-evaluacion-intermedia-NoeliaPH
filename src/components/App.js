import { useState, useEffect } from "react";
import "../styles/App.scss";
import callToApi from "..//services/fetch.js";

function App() {
  useEffect(() => {
    callToApi().then((adalabers) => {
      setData(adalabers.results);
    });
  }, []);

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [counselor, setCounselor] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterCounselor, setFilterCounselor]= useState("All");
  
  const handleChangeName = (ev) => {
    setName(ev.currentTarget.value);
  };
  const handleChangeCounselor = (ev) => {
    setCounselor(ev.currentTarget.value);
  };
  const handleChangeSpeciality = (ev) => {
    setSpeciality(ev.currentTarget.value);
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    const newAdalaber = {
      name: name,
      counselor: counselor,
      speciality: speciality,
    };
    setData([...data, newAdalaber]);

    setName("");
    setCounselor("");
    setSpeciality("");
  };

  const handleChangeFilterName = (ev) => {
setFilterName(ev.currentTarget.value);
  };
  const handleChangeFilterCounselor = (ev) => {
setFilterCounselor(ev.currentTarget.value);
  };

  const htmlAdalabers = data
  .filter((adalaber)=> {
    if (filterCounselor === 'All'){
      return true;
    }else{
      return adalaber.counselor === filterCounselor
    }
  })
  .filter((adalaber) => adalaber.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase()))
  .map((adalaber, id) => (
    <tr key={id}>
      <td>{adalaber.name}</td>
      <td>{adalaber.counselor}</td>
      <td>{adalaber.speciality}</td>
    </tr>
  ));


  return (
    <div>
      <header>
        <h1>Lista de Adalabers</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>TUTOR/A</th>
            <th>ESPECIALIDAD</th>
          </tr>
        </thead>
        <tbody>{htmlAdalabers}</tbody>
      </table>
      <h2>Añadir a una Adalaber:</h2>
      <form>
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
          onChange={handleChangeSpeciality}
          value={speciality}
        />
        <input type="submit" value="Añadir" onClick={handleClick} />
      </form>
      <h2>Filtrar:</h2>
      <form action="" className="filters">
          <label htmlFor="name">
            Nombre:
            <input
              onChange={handleChangeFilterName}
              value={filterName}
              type="text"
              name="name"
              id="name"
              placeholder="Ej: MariCarmen"
            />
          </label>
          <label className="filters__text" htmlFor="counselor">
            Selecciona un/a tutor/a:
            <select
              onChange={handleChangeFilterCounselor}
              value={filterCounselor}
              name="counselor"
              id="counselor"
            >
              <option value="All">Selecciona</option>
              <option value="Dayana">Dayana</option>
              <option value="Iván">Iván</option>
              <option value="Miguel">Miguel</option>
              <option value="Yanelis">Yanelis</option>
            </select>
          </label>
        </form>
    </div>
  );
}

export default App;
