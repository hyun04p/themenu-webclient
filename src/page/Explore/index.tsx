import React from 'react';
import './index.scss';

import { Link } from 'react-router-dom';

interface props {}

const ExporePage: React.FC<props> = (props) => {
  return (
    <div>
      ExporePage
      <Link to="/order">order</Link>
    </div>
  );
};

export default ExporePage;
