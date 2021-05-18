import React from 'react';
import './OrderRow.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { OrderAction } from '@store/actions';

interface props {
  category: string;
}

const OrderRow: React.FC<props> = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.Order.store.menu.items);

  const filterByCategory = (items: any, category: string) => {
    const itemsArray: [] = items.allIds.map((id: string) => items.byId[id]);

    const filteredItem = itemsArray.filter((item: any) =>
      item.categories.includes(category)
    );
    // shuffle(filteredItem);
    return filteredItem;
  };

  function shuffle(array: any[]) {
    array.sort(() => Math.random() - 0.5);
  }

  const produceOnClickTile = (itemId: string) => () => {
    dispatch(OrderAction.showMenuDetailModal(itemId));
  };

  return (
    <div className="OrderRow">
      <h3>{props.category}</h3>
      <div className="tileContainer hide-scrollbar">
        {filterByCategory(items, props.category).map((item: any) => {
          return (
            <div
              key={item.id}
              className="menuTile"
              onClick={produceOnClickTile(item.id)}
            >
              <h4>{item.id}</h4>
              <p>{item.price + ''}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderRow;
