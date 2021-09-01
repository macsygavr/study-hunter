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

export default function Modal({ setIsModalOpened }) {
  // const addCourseHandler = (event) => {
  //   event.preventDefault();
  // };

  return (
    <div style={OVERLAY_STYLES}>
      <div className="container d-flex justify-content-center my-5 bg-light p-4 border border-4 rounded" style={MODAL_STYLES}>
        <form id="newCourseForm" style={{ width: '85%' }}>
          <div className="mb-2 d-flex flex-column align-items-start">
            <p className="mb-1">Название направления</p>
            <input required name="name" type="text" className="form-control" />
          </div>
          <div className="mb-2 d-flex flex-column align-items-start">
            <p className="mb-1">Специализация</p>
            <input required name="phone" type="text" className="form-control" />
          </div>
          <div className="mb-2 d-flex flex-column align-items-start">
            <p className="mb-1">Цена</p>
            <input required name="email" type="text" className="form-control" />
          </div>
          <div className="mb-2 d-flex flex-column align-items-start">
            <p className="mb-1">Форма направления</p>
          </div>
          <div className="mb-2 d-flex flex-column align-items-start">
            <p className="mb-1">Описание</p>
            <textarea placeholder="Добавьте описание" name="description" style={{ width: '100%' }} />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onSubmit={(event) => {
              event.preventDefault();
              console.log(event.target);
            }}
          >
            Добавить

          </button>
          <button type="button" className="btn btn-danger position-fixed top-0 end-0" onClick={() => setIsModalOpened((state) => !state)}>Х</button>
        </form>
      </div>
    </div>
  );
}
