import React, { useEffect, useState } from 'react';
import './index.scss';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FirebaseAction, UIAction } from '@store/actions';

interface props {}

const ExporePage: React.FC<props> = (props) => {
  const dispatch = useDispatch();
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  const places = ['하남 돼지', 'bowl room'];

  return (
    <div className="ExplorePage hide-scrollbar">
      {/* <div className="contentContainer"> */}
      {places.map((place, index) => {
        return (
          <PlaceView key={place} index={index}>
            {place}
          </PlaceView>
        );
      })}
      {/* </div> */}
    </div>
  );
};

interface PlaceViewProps {
  index: number;
}
const PlaceView: React.FC<PlaceViewProps> = (props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.index % 2 === 0 ? '#fff' : '#eee',
      }}
      className="element"
    >
      {props.children}
    </div>
  );
};

export default ExporePage;
