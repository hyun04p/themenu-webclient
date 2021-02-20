import React, { useEffect, useState } from 'react';
import './OrderRow.scss';

interface props {
  category: string;
  items: any;
}

const OrderRow: React.FC<props> = (props) => {
  const [fakeMenu, setFakeMenu] = useState([1, 2, 3, 4, 5, 6, 7]);

  const filterByCategory = (items: any, category: string) => {
    const itemsArray: [] = items.allIds.map((id: string) => items.byId[id]);

    const filteredItem = itemsArray.filter((item: any) =>
      item.categories.includes(category)
    );
    shuffle(filteredItem);
    return filteredItem;
  };

  function shuffle(array: any[]) {
    array.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="OrderRow">
      <h3>{props.category}</h3>
      <div className="tileContainer hide-scrollbar">
        {filterByCategory(props.items, props.category).map((item: any) => {
          return (
            <div key={item.id} className="menuTile">
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
