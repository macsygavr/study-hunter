/* eslint-disable camelcase */
import axios from 'axios';
import { useState } from 'react';

export default function AdminButton(item) {
  const { id, is_checked } = item;
  const [isChecked, setIsChecked] = useState(is_checked);
  const acceptHandler = (OrgId) => {
    axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/changebid`, {
      status: 'accept',
      id: OrgId,
    })
      .then((res) => setIsChecked(res.data));
  };

  const declineHandler = (OrgId) => {
    axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/changebid`, {
      status: 'decline',
      id: OrgId,
    })
      .then((res) => setIsChecked(res.data));
  };

  return (
    <div>
      { isChecked ? 'Заявка рассмотрена'
        : (
          <div>
            <button type="button" onClick={() => acceptHandler(id)}>Подтвердить</button>
            <button type="button" onClick={() => declineHandler(id)}>Отклонить</button>
          </div>
        )}
    </div>
  );
}
