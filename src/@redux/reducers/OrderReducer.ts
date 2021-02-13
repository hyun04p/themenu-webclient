import { OrderAction } from '@redux/actions';
import { Action } from '../Types';

export interface Order {
  // tableNum: number;
  orderer: {
    isValid: boolean;
    loading: boolean;
    storeId: string;
    tableNum: number;
    seatNum: number;
  };
  store: {
    information: {
      name: string;
      address: string;
      phone: string;
    };
    menu: {
      categories: Category[];
      option_groups: OptionGroup[];
      items: Item[];
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
    isValid: false,
    loading: true,
    storeId: '',
    tableNum: -1,
    seatNum: -1,
  },
  store: {
    information: {
      name: '',
      address: '',
      phone: '',
    },
    menu: {
      categories: [],
      option_groups: [],
      items: [],
    },
  },
};

const OrderReducer = (state = initialState, action: Action) => {
  const { payload } = action;

  switch (action.type) {
    case OrderAction.Types.SET_STORE:
      return {
        ...state,
        store: {
          ...state.store,
          information: payload.information,
          menu: payload.menu,
        },
      };

    case OrderAction.Types.SET_ORDERER:
      return {
        ...state,
        orderer: {
          ...state.orderer,
          storeId: payload.storeId,
          tableNum: payload.tableNum,
          seatNum: payload.seatNum,
          isValid: true,
        },
      };

    case OrderAction.Types.SET_LOADING:
      return {
        ...state,
        orderer: {
          ...state.orderer,
          loading: payload.loading,
        },
      };

    default:
      return state;
  }
};

export default OrderReducer;
