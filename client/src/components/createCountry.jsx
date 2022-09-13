import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import { getActivity, getCountries, postActivity } from "../actions/index";
import "../estilos/form.css"



function valida(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name required";
  }
  return errors;
}


function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      valida({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(id) {
    setInput({
      ...input,
      countries: [...input.countries, id.target.value],
    });
  }

  function handleSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
  }

  function handleSelctDifficulty(e) {
    setInput({
      ...input,
      difficulty: e.target.value,
    });
  }

  function handleSelectDuration(e) {
    setInput({
      ...input,
      duration: e.target.value,
    });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(input));

    alert('Registraste con exito tu actividad, gracias!') 
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    history.push("/home");
  
  }

  const season = ["Otoño", "Invierno", "Primavera", "Verano"];
  const difficulty = ["Principiante", "Aficionado", "Normal", "Profesional", "Experto"];
  const duration = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  return (
    <div>
      <div>
        <div>
          <h2>Agregar actividad a un Pais...</h2>
         
          <div className="formFlex">
            <form onSubmit={handleSubmit} className="form-box">
              <div>
                <label>Activity: </label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Activity name..."
                  required
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div>
                <label>Season: </label>
                <select onChange={handleSeason} required>
                  <option value="" hidden>
                    Select season
                  </option>
                  {season.map((e) => (
                    <option value={e} name="season" key={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Difficulty: </label>
                <select onChange={handleSelctDifficulty} required>
                  <option value="" hidden>
                    Dificultad
                  </option>
                  {difficulty.map((e) => (
                    <option value={e} name="difficulty">
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Duration: </label>
                <select onChange={handleSelectDuration} required>
                  <option value="" hidden>
                    Duracion
                  </option>
                  {duration.map((e) => (
                    <option value={e} name="duration">
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Country: </label>
                <select onChange={handleSelect} required>
                  <option value="" hidden>
                    Select country
                  </option>
                  {countries.map((e) => (
                    <option value={e.name} name="countries" key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <ul>
                  <li>
                    {input.countries.map((i) => (
                      <div>
                        {i}
                        <button className="btn-delete" onClick={() => handleDelete(i)} type="button">
                          X
                        </button>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
              <button className="btn-submit" type="submit">Add Activity</button>
            </form>
           </div>

                <div className="flex-gifs">    
                <div>
                <img src="https://1.bp.blogspot.com/-xWcxzoVVJt4/Xe4M8EpJt_I/AAAAAAAAA8k/J94rjah9pC8bLCne71AgFHLmiK6HoFh-ACLcBGAsYHQ/s1600/marcheura24.gif" alt="" />
                </div>
                <div>
                  <img src="https://www.gifsanimados.org/data/media/284/esqui-imagen-animada-0012.gif" alt="" />
                </div>
                </div>   
             
        </div>
      </div>
    </div>
  );
}

export default AddActivity;

