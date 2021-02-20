import { OrderAction } from '@store/actions';
import { act } from 'react-dom/test-utils';
import { Action } from '../Types';

export interface Order {
  // tableNum: number;
  orderer: {
    isValid: boolean;
    storeId: string | undefined;
    tableNum: number;
    seatNum: number;
  };
  store: {
    information: {
      name: string;
      address: string;
      phone: string;
      table_count: number;
    };
    menu: {
      categories: string[];
      option_groups: OptionGroup[];
      items: {};
    };
  };
}

interface Category {
  name: string;
  description: string;
}
interface Option {
  name: string;
  price: number;
  is_available: boolean;
}
interface OptionGroup {
  name: string;
  max_select: number;
  options: Option[];
}
interface Item {
  name: string;
  price: string;
  description: string;
  categories: string[];
  option_groups: number[];
  is_available: boolean;
}

const initialState: Order = {
  orderer: {
    isValid: true,
    storeId: undefined,
    tableNum: -1,
    seatNum: -1,
  },
  store: {
    information: {
      name: '',
      address: '',
      phone: '',
      table_count: 0,
    },
    menu: {
      categories: [],
      option_groups: [],
      items: {},
    },
  },
};

const OrderReducer = (
  state = initialState,
  action: OrderAction.ActionTypes
): Order => {
  switch (action.type) {
    case OrderAction.Types.SET_ORDERER:
      return {
        ...state,
        orderer: {
          ...state.orderer,
          storeId: action.payload.storeId,
          tableNum: action.payload.tableNum,
          seatNum: action.payload.seatNum,
        },
      };

    case OrderAction.Types.SET_STORE:
      return {
        ...state,
        store: action.payload.store,
      };

    case OrderAction.Types.SET_IS_ORDERER_VALID:
      return {
        ...state,
        orderer: {
          ...state.orderer,
          isValid: action.payload.isValid,
        },
      };

    default:
      return state;
  }
};

export default OrderReducer;
