import { Link } from 'react-router-dom';

export default function RequestsItem({
  userFirstName,
  userLastName,
  userPhone,
  userEmail,
  courseId,
  courseName,
}) {
  return (
    <>
      <div className="col">{userFirstName}</div>
      <div className="col">{userLastName}</div>
      <div className="col">{userPhone}</div>
      <div className="col">{userEmail}</div>
      <Link to={`/course/${courseId}`} className="col postItemLink">{courseName}</Link>
    </>
  );
}
