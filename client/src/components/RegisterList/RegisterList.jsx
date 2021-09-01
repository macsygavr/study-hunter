/* eslint-disable max-len */
/* eslint-disable no-lone-blocks */

import axios from 'axios';
import { useEffect, useState } from 'react';
import RegisterItem from '../RegisterItem/RegisterItem';

export default function RegisterList() {
  const [register, setRegister] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/bid`)
      .then((res) => setRegister(res.data));
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: 'left' }}>Заявки учебных заведений</h3>
      <hr style={{ marginBottom: '40px' }} />
      {register.map((item) => <RegisterItem key={item.id} {...item} />)}

    </div>
  );
}
