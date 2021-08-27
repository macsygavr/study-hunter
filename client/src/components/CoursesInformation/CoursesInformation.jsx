import { Link } from 'react-router-dom';

export default function CoursesInformation() {
  return (
    <div className="courses__info">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Название направления:</h3>
        <button type="button">Добавить в избранное</button>
      </div>
      <p>Цена обучения:</p>
      <p>Формат обучения</p>
      <Link to="/detailUz"><p>Название учебного заведения:</p></Link>
      <p>Информация по курсу:</p>
    </div>
  );
}
