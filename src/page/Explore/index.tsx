import React, { useEffect } from 'react';
import './index.scss';

import { Link } from 'react-router-dom';

interface props {}

const ExporePage: React.FC<props> = (props) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        console.log(position)
      );
    }
  }, []);

  return (
    <div>
      ExporePage
      <Link to="/order">order</Link>
      <div>
        <h3>위치</h3>
        <p></p>
      </div>
    </div>
  );
};

export default ExporePage;
