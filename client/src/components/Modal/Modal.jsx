import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCourseStart } from '../../redux/actions/organizationsAC';
import SearchOption from '../SearchOption/SearchOption';
import './Modal.css';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  width: '400px',
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
};

export default function Modal({ setIsModalOpened, orgId }) {
  const { currentOrganization } = useSelector((state) => state);
  const [currentCourses] = useState(currentOrganization.OrganizationCourses);
  const [isAdded, setIsAdded] = useState(false);

  const dispatch = useDispatch();
  const [arrOfSpecialitiesOptions, setArrOfSpecialitiesOptions] = useState([]);
  const [arrOfTypesOptions, setArrOfTypesOptions] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/options`) // env variable
      .then((res) => {
        setArrOfSpecialitiesOptions(res.data.arrOfSpecialitiesOptions);
        setArrOfTypesOptions(res.data.arrOfTypesOptions);
      });
  }, []);

  useEffect(() => {
    if (currentCourses.length !== currentOrganization.OrganizationCourses.length) {
      setIsAdded(true);
    }
  }, [currentOrganization]);

  const addCourseHandler = () => {
    const { newCourseForm } = document.forms;
    const {
      name, speciality, price, form, description,
    } = newCourseForm;
    // eslint-disable-next-line max-len
    if (!name.value || !speciality.value || !price.value || (Number(price.value) < 0) || !form.value) {
      if (!name.value || !name.value.trim()) newCourseForm.name.classList.add('is-invalid');
      if (!speciality.value) newCourseForm.speciality.classList.add('is-invalid');
      if (!price.value || (Number(price.value) < 0)) {
        newCourseForm.price.classList.add('is-invalid');
      }
      if (!form.value) newCourseForm.form.classList.add('is-invalid');
    } else {
      dispatch(addNewCourseStart(
        name.value,
        speciality.value,
        price.value,
        form.value,
        description.value,
        orgId,
      ));
    }
  };

  const removeIsInvalidStyle = (event) => event.target.classList.remove('is-invalid');

  return (
    <div style={OVERLAY_STYLES}>
      <div id="newCourseModal" className="container d-flex justify-content-center my-5 bg-light p-4 border border-4 rounded" style={MODAL_STYLES}>
        {isAdded
          ? (
            <div className="d-flex flex-column align-items-center">
              <div className="alert alert-primary">
                Ваш курс был успешно добавлен!
              </div>
              <button type="button" className="btn myLinkButton w-25" onClick={() => setIsModalOpened((state) => !state)}>OK</button>
            </div>
          )
          : (
            <form id="newCourseForm" style={{ width: '85%' }}>
              <div className="mb-2 d-flex flex-column align-items-start">
                <p className="mb-1">Название направления</p>
                <input required name="name" type="text" className="form-control" onChange={removeIsInvalidStyle} />
              </div>
              <div className="mb-2 d-flex flex-column align-items-start">
                <p className="mb-1">Специальность</p>
                <select className="form-select" id="speciatityId" name="speciality" onChange={removeIsInvalidStyle}>
                  <option value="">Выберите из списка</option>
                  {arrOfSpecialitiesOptions.map((item) => (
                    <SearchOption
                      key={item.id}
                      value={item.id}
                      name={item.name}
                    />
                  ))}
                </select>
              </div>
              <div className="mb-2 d-flex flex-column align-items-start">
                <p className="mb-1">Цена</p>
                <input required name="price" type="number" className="form-control" onChange={removeIsInvalidStyle} />
              </div>
              <div className="mb-2 d-flex flex-column align-items-start">
                <p className="mb-1">Форма направления</p>
                <select className="form-select" id="formId" name="form" onChange={removeIsInvalidStyle}>
                  <option value="">Выберите из списка</option>
                  {arrOfTypesOptions.map((item) => (
                    <SearchOption
                      key={item.id}
                      value={item.id}
                      name={item.form}
                    />
                  ))}
                </select>
              </div>
              <div className="mb-2 d-flex flex-column align-items-start">
                <p className="mb-1">Описание</p>
                <textarea placeholder="Добавьте описание" name="description" style={{ width: '100%' }} />
              </div>
              <button type="button" className="btn myLinkButton" onClick={addCourseHandler}>Добавить</button>
              <button type="button" className="btn btn-danger position-fixed top-0 end-0" onClick={() => setIsModalOpened((state) => !state)}>Х</button>
            </form>
          )}
      </div>
    </div>
  );
}
