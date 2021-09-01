/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import AdminButton from '../AdminButton/AdminButton';

export default function RegisterItem(item) {
  const {
    id, name, is_checked,
  } = item;
  return is_checked ? '' : (
    <div className="CoursesTableP">
      <Link className="postItemLink" to={`/organization/${id}`}>
        {name}
      </Link>
      <AdminButton {...item} />
    </div>
  );
}
