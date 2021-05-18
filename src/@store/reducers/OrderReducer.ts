import { OrderAction } from '@store/actions';

/**
 * @MenuRelatedTypes
 */
interface Item {
  id: string;
  price: number;
  description: string;
  categories: string[];
  option_groups: string[];
  available: boolean;
}
interface OptionGroup {
  id: string;
  max_select: number;
  min_select: number;
  options: Option[];
}
interface Option {
  name: string;
  price: number;
  availabe: boolean;
}
interface BucketOption {
  name: string; // '[option_gourp_id] option_id'
  price: number;
}
interface BucketElement {
  id: string;
  itemId: string;
  count: number;
  options: BucketOption[];
}

/**
 * @OrderRootType
 */
export interface Order {
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
      option_groups: {
        byId: { [key: string]: OptionGroup };
        allIds: string[];
      };
      items: {
        byId: { [key: string]: Item };
        allIds: string[];
      };
    };
  };
  order: {
    detailModalId: string | undefined;
    bucket: { [key: string]: BucketElement };
    receipt: {};
  };
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
      option_groups: {
        byId: {},
        allIds: [],
      },
      items: {
        byId: {},
        allIds: [],
      },
    },
  },
  order: {
    detailModalId: undefined,
    bucket: {},
    receipt: {},
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

    case OrderAction.Types.SHOW_MENU_DETAIL_MODAL:
      return {
        ...state,
        order: {
          ...state.order,
          detailModalId: !state.order.detailModalId
            ? action.payload.itemId
            : state.order.detailModalId,
        },
      };

    case OrderAction.Types.HIDE_MENU_DETAIL_MODAL:
      return {
        ...state,
        order: {
          ...state.order,
          detailModalId: undefined,
        },
      };

    case OrderAction.Types.PUT_ITEM_TO_BUCKET:
      if (state.order.bucket[action.payload.id] !== undefined) {
        return {
          ...state,
          order: {
            ...state.order,
            bucket: {
              ...state.order.bucket,
              [action.payload.id]: {
                ...state.order.bucket[action.payload.id],
                count:
                  state.order.bucket[action.payload.id].count +
                  action.payload.count,
              },
            },
          },
        };
      } else {
        return {
          ...state,
          order: {
            ...state.order,
            bucket: {
              ...state.order.bucket,
              [action.payload.id]: {
                id: action.payload.id,
                itemId: action.payload.itemId,
                options: action.payload.options,
                count: action.payload.count,
              },
            },
          },
        };
      }

    default:
      return state;
  }
};

export default OrderReducer;
