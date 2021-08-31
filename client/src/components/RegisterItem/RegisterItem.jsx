/* eslint-disable max-len */
/* eslint-disable no-lone-blocks */
import { Link } from 'react-router-dom';

export default function RegisterItem(item) {
  const {
    id, name,
  } = item;
  return (
    <p className="CoursesTableP">
      <Link className="postItemLink" to={`/organization/${id}`}>
        {name}
      </Link>
    </p>
  );
}
