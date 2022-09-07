import { createStore, Store, useStore as baseUseStore } from "vuex";
import NavModel from "@/models/NavModel";
import { MutaionEnum } from "@/enums/MutationEnum";
import { InjectionKey } from "vue";
import RequestModel from "@/models/RequestModel";

export interface State {
  useLocalStorage: boolean;
  navs: Array<NavModel>;
  requests: Array<RequestModel>;
  baseUrls: Array<string>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    useLocalStorage: true,
    navs: new Array<NavModel>(),
    requests: new Array<RequestModel>(),
    baseUrls: new Array<string>(),
  },
  mutations: {
    [MutaionEnum.SET_Group]: (state: State, nav: NavModel) => {
      state.navs.push(nav);
    },
    [MutaionEnum.SET_StoreWay]: (state: State, isLocalStorage: boolean) => {
      state.useLocalStorage = isLocalStorage;
    },
    [MutaionEnum.SET_Request]: (state: State, request: RequestModel) => {
      state.requests.push(request);
    },
    [MutaionEnum.SET_BaseUrl]: (state: State, baseUrl: string) => {
      state.baseUrls.push(baseUrl);
    },
  },
  getters: {
    [MutaionEnum.GET_RequestByGroup]: (state: State) => (parentId: string) => {
      return state.requests.filter((p) => p.parentId === parentId);
    },
  },
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
