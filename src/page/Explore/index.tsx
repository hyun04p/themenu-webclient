import React, { useEffect, useState } from 'react';
import './index.scss';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UIAction } from '@redux/actions';

interface props {}

const ExporePage: React.FC<props> = (props) => {
  const dispatch = useDispatch();
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) =>
  //       setCoord({
  //         x: position.coords.latitude,
  //         y: position.coords.longitude,
  //       })
  //     );
  //   }
  // });

  return (
    <div>
      ExporePage
      <Link to="/order">order</Link>
      <div>
        <h3>위치</h3>
        <p>{`x: ${coord.x}\ny: ${coord.y}`}</p>
      </div>
      <div
        onClick={() => {
          setTimeout(() => {
            dispatch(
              UIAction.queueNotification({
                notification: { title: 'test noti2', content: 'good2' },
              })
            );
          }, 2000);
          dispatch(
            UIAction.queueNotification({
              notification: { title: 'test noti', content: 'good' },
            })
          );
        }}
      >
        notify
      </div>
    </div>
  );
};

export default ExporePage;
