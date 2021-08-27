function Search() {
  return (
    <div className="input-group" style={{ width: '1000px' }}>
      <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
        <option selected>Специальность</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
        <option selected>Форма обучения</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <input type="text" className="form-control" placeholder="Цена от (руб.)" aria-label="Recipient's username" aria-describedby="button-addon2" />
      <input type="text" className="form-control" placeholder="Цена до (руб.)" aria-label="Recipient's username" aria-describedby="button-addon2" />
      <button className="btn btn-outline-secondary" type="button">Найти</button>
    </div>
  );
}

export default Search;
