import axios from 'axios';

function Search() {
  const searchHandler = (e) => {
    e.preventDefault();
    const specialityId = e.target.speciatity_id.value;
    const typeId = e.target.type_id.value;
    const priceMin = e.target.price_min.value;
    const priceMax = e.target.price_max.value;
    console.log(specialityId, typeId, priceMin, priceMax);
    axios.post('http://localhost:3005/', {
      specialityId,
      typeId,
      priceMin,
      priceMax,
    })
      .then((res) => console.log(res.data));
  };

  return (
    <form onSubmit={searchHandler} className="input-group" style={{ width: '1000px' }}>
      <select className="form-select" id="speciatity_id" aria-label="Example select with button addon">
        <option disabled selected>Специальность</option>
        <option value="1">автомеханика</option>
        <option value="2">бухгалтерия</option>
        <option value="3">IT</option>
      </select>
      <select className="form-select" id="type_id" aria-label="Example select with button addon">
        <option disabled selected>Форма обучения</option>
        <option value="1">Очное</option>
        <option value="2">Заочное</option>
        <option value="3">Дистанционное</option>
      </select>
      <input type="text" className="form-control" id="price_min" placeholder="Цена от (руб.)" aria-label="Recipient's username" aria-describedby="button-addon2" />
      <input type="text" className="form-control" id="price_max" placeholder="Цена до (руб.)" aria-label="Recipient's username" aria-describedby="button-addon2" />
      <button className="btn btn-outline-secondary" type="submit">Найти</button>
    </form>
  );
}

export default Search;
