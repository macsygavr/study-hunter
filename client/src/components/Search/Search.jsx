/* eslint-disable max-len */
import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchOption from '../SearchOption/SearchOption';

function Search({ searchHandler }) {
  const [arrOfSpecialitiesOptions, setArrOfSpecialitiesOptions] = useState([]);
  const [arrOfTypesOptions, setArrOfTypesOptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/options')
      .then((res) => {
        setArrOfSpecialitiesOptions(res.data.arrOfSpecialitiesOptions);
        setArrOfTypesOptions(res.data.arrOfTypesOptions);
      });
  }, []);

  return (
    <div style={{
      width: '1000px', marginTop: '270px', marginBottom: '160px',
    }}
    >
      <form
        onSubmit={searchHandler}
        className="input-group"
      >
        <select className="form-select" id="speciatityId" aria-label="Example select with button addon">
          <option>Специальность</option>
          {arrOfSpecialitiesOptions.map((item) => <SearchOption key={item.id} value={item.id} name={item.name} />)}
        </select>
        <select className="form-select" id="typeId" aria-label="Example select with button addon" defaultValue="Форма обучения">
          <option>Форма обучения</option>
          {arrOfTypesOptions.map((item) => <SearchOption key={item.id} value={item.id} name={item.form} />)}
        </select>
        <input type="text" className="form-control" id="priceMin" placeholder="Цена от (руб.)" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <input type="text" className="form-control" id="priceMax" placeholder="Цена до (руб.)" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <input type="text" className="form-control" style={{ width: '155px' }} id="courseName" placeholder="Название курса" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <button className="btn btn-outline-secondary" type="submit">Найти</button>
      </form>
    </div>
  );
}

export default Search;
