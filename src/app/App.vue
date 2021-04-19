<template>
  <div class="container mx-auto px-4">
    <div class="grid grid-rows-1 grid-flow-col gap-4">
      <div class="col">
        <input
          type="text"
          autofocus
          id="username"
          class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-50 w-full"
          placeholder="Username"
        />
      </div>
      <div class="col">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="todoStore.addTodo('bla')"
        >
          Add
        </button>
      </div>
    </div>
    <div class="row"></div>
    <div class="grid grid-cols-12 gap-2">
      <div
        class="h-16 rounded overflow-hidden border w-full bg-gray-400 mx-3 md:mx-0 lg:mx-0"
        v-for="todo in todoStore.todos"
        :key="todo.id"
      >
        <div class="px-3 py-1 text-lg font-medium">
          {{ todo.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { TodoStore } from "./store/todo/todoModule";
import { useModule } from "./store";
export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    const todoStore: TodoStore = useModule(TodoStore);
    todoStore.fetchTodos();

    return { todoStore };
  },
});
</script>

<style></style>
