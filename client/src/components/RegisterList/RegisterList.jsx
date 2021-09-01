/* eslint-disable max-len */
/* eslint-disable no-lone-blocks */

import axios from 'axios';
import { useEffect, useState } from 'react';
import RegisterItem from '../RegisterItem/RegisterItem';

export default function RegisterList() {
  const [register, setRegister] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/bid`)
      .then((res) => setRegister(res.data));
  }, []);
  const arrOfBil = register.filter((item) => item.is_checked === false);
  console.log(arrOfBil.length);
  return (
    <div>
      <h3 style={{ textAlign: 'left' }}>Заявки учебных заведений</h3>
      <hr style={{ marginBottom: '40px' }} />
      {arrOfBil.length ? (
        <div>
          {register.map((item) => <RegisterItem key={item.id} {...item} />)}
        </div>
      ) : 'Нет активных заявок' }

    </div>
  );
}
