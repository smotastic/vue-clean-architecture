<template>
  <div class="container mx-auto px-4">
    <div>
      <button @click="todoStore.addTodo('bla')">Add</button>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-gray-50" v-for="todo in todoStore.todos" :key="todo.id">
        {{ todo.name }}
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
