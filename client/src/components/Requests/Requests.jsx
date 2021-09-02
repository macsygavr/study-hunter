import RequestsItem from '../RequestsItem/RequestsItem';

export default function Requests({ requestsToRender }) {
  const renderRequests = () => (requestsToRender && requestsToRender.length
    ? requestsToRender.map((request) => (
      <>
        <div className="row row-cols-5 align-items-center" key={request.userId + request.courseId}>
          <RequestsItem {...request} />
        </div>
        <hr style={{ color: 'rgb(198, 198, 198)' }} />
      </>
    ))
    : (<div>Здесь пока нет откликов</div>));

  return (
    <div>
      {requestsToRender && requestsToRender.length
        ? (
          <>
            <div className="row row-cols-5 align-items-center">
              <strong className="col">Имя</strong>
              <strong className="col">Фамилия</strong>
              <strong className="col">Телефон</strong>
              <strong className="col">Email</strong>
              <strong className="col">Направление</strong>
            </div>
            <hr style={{ color: 'rgb(198, 198, 198)', marginTop: '15px' }} />
          </>
        )
        : null}
      {renderRequests()}
    </div>
  );
}
