import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { lazyInject } from "../../../infrastructure/todo/inversify.config";
import TYPES from "../../../domain/todo/todoTypes";
import ListTodoUseCase from "../../../domain/todo/usecases/listTodoUseCase";
import CreateTodoUseCase from "../../../domain/todo/usecases/createTodoUseCase";
import Todo from "../../../domain/todo/model/todo";
import { toHandlers } from "@vue/runtime-core";
export interface TodoState {
  todos: Todo[];
}

@Module({
  name: "todoModule",
  namespaced: true,
})
export class TodoStore extends VuexModule implements TodoState {
  @lazyInject(TYPES.ListTodoUseCase)
  public listUsecase!: ListTodoUseCase;
  @lazyInject(TYPES.CreateTodoUseCase)
  public createUsecase!: CreateTodoUseCase;

  public todos: Todo[] = [];

  @Mutation
  setTodos(items: Todo[]) {
    this.todos = items;
  }

  @Action({ rawError: true })
  async fetchTodos() {
    const list = await this.listUsecase.listTodo();
    // this.galaxies = list;
    this.setTodos(list);
  }

  @Action({ rawError: true })
  async addTodo(todoName: string) {
    const createdTodo: Todo = await this.createUsecase.createTodo(todoName);
    this.todos.push(createdTodo);
    // this.addTodoToItems(createdTodo);
  }
}
