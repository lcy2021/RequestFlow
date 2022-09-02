import { createStore, Store, useStore as baseUseStore } from "vuex";
import NavModel from "@/models/NavModel";
import { SET_Flow, SET_StoreWay, SET_Request } from "@/enums/MutationEnum";
import { InjectionKey } from "vue";
import RequestModel from "@/models/RequestModel";

export interface State {
  useLocalStorage: boolean;
  navs: Array<NavModel>;
  requests: Array<RequestModel>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    useLocalStorage: true,
    navs: new Array<NavModel>(),
    requests: new Array<RequestModel>(),
  },
  mutations: {
    [SET_Flow]: (state: State, nav: NavModel) => {
      state.navs.push(nav);
    },
    [SET_StoreWay]: (state: State, isLocalStorage: boolean) => {
      state.useLocalStorage = isLocalStorage;
    },
    [SET_Request]: (state: State, request: RequestModel) => {
      state.requests.push(request);
    },
  },
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
