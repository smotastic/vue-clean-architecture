import { InjectionKey } from "vue";
import Vuex from "vuex";
import {
  TodoState,
  TodoStore,
} from "../../../features/todo/app/store/todoModule";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { VuexModule, getModule } from "vuex-module-decorators";
// https://next.vuex.vuejs.org/guide/typescript-support.html#typing-store-property-in-vue-component
export interface RootState {
  todoModule: TodoState;
}

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = new Vuex.Store<RootState>({
  modules: {
    todoModule: TodoStore,
  },
});

function useStore() {
  return baseUseStore(key);
}
declare type ConstructorOf<C> = {
  new (...args: any[]): C;
};

export function useModule<M extends VuexModule>(
  moduleClass: ConstructorOf<M>
): M {
  const store = useStore();
  const moduleStore: M = getModule(moduleClass, store);
  return moduleStore;
}
