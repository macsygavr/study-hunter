/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import './registerItem.css';
import { Link } from 'react-router-dom';
import AdminButton from '../AdminButton/AdminButton';

export default function RegisterItem(item) {
  const {
    id, name, is_checked,
  } = item;
  return is_checked ? '' : (
    <>
      <div className="organizationsTableP">
        <Link className="postItemLink" to={`/organization/${id}`}>
          {name}
        </Link>
        <AdminButton {...item} />
      </div>
      <hr style={{ marginTop: '0px', color: 'rgb(198, 198, 198)' }} />
    </>
  );
}
