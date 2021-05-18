import React, { useEffect, useReducer } from 'react';
import './OptionSelector.scss';

import { RootState } from '@store';
import { useSelector } from 'react-redux';

interface props {}

const OptionSelector: React.FC<props> = (props) => {
  const optionGroups = useSelector((state: RootState) => {
    if (!state.Order.order.detailModalId) {
      return undefined;
    }
    return state.Order.store.menu.items.byId[
      state.Order.order.detailModalId
    ].option_groups.map((opId) => {
      return state.Order.store.menu.option_groups.byId[opId];
    });
  });

  if (optionGroups !== undefined) optionGroups[0].id = 'test';

  if (!optionGroups) return null;

  return (
    <>
      {optionGroups.map((optionGroup, idx) => {
        return (
          <div className="optionGroup" key={idx + ''}>
            <h4 className="name">{optionGroup.id}</h4>
            <div className="optionContainer">
              {optionGroup.options.map((option) => {
                return (
                  <div key={option.name} className="optionBtn">
                    <div>{option.name}</div>
                    <div>{option.price}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* {items.byId[itemId].option_groups.map((opId) => {
        return (
          <div key={opId} className="optionGroup">
            <h4 className="name">{optionGroups.byId[opId].id}</h4>
            <div className="optionContianer">
              {optionGroups.byId[opId].options.map((option) => {
                return (
                  <div key={option.name} className="optionBtn">
                    <div>{option.name}</div>
                    <div>{option.price}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })} */}
    </>
  );
};

export default OptionSelector;
