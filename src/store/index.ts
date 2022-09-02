import { createStore, Store, useStore as baseUseStore } from "vuex";
import NavModel from "@/models/NavModel";
import {
  SET_Flow,
  SET_StoreWay,
  SET_Request,
  GET_RequestByFlow,
} from "@/enums/MutationEnum";
import { InjectionKey } from "vue";
import RequestModel from "@/models/RequestModel";
import { Guid } from "guid-typescript";

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
  getters: {
    [GET_RequestByFlow]: (state: State) => (parentId: string) => {
      return state.requests.filter((p) => p.parentId === parentId);
    },
  },
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
