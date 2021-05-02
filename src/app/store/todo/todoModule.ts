import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { lazyInject } from "../../../infrastructure/todo/inversify.config";
import TYPES from "../../../domain/todo/todoTypes";
import ListTodoUseCase from "../../../domain/todo/usecases/listTodoUseCase";
import CreateTodoUseCase from "../../../domain/todo/usecases/createTodoUseCase";
import Todo from "../../../domain/todo/model/todo";
import DeleteTodoUseCase from "../../../domain/todo/usecases/deleteTodoUseCase";
import { Either, Right } from "purify-ts/Either";
import Failure from "../../../core/domain/failures/failure";
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
  @lazyInject(TYPES.CreateTodoUseCase)
  public deleteUsecase!: DeleteTodoUseCase;

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
  async addTodo(todoName: string): Promise<Either<Failure, Todo>> {
    const createdTodo = await this.createUsecase.createTodo(todoName);

    return createdTodo.chain((r) => {
      this.todos.push(r);
      return Right(r);
    });
  }

  @Action({ rawError: true })
  async deleteTodo(id: number) {
    await this.deleteUsecase.deleteTodo(id);
    this.fetchTodos();
  }
}
