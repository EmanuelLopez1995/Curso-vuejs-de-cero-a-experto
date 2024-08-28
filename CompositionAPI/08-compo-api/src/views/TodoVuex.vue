<template>
  <h1>Thanos Todo List</h1>
  <h4>Tareas: {{pending.length}}</h4>
  
  <hr>
  <button :class="{'active': currentTab === 'all'}" @click="currentTab = 'all'">ToDos</button>
  <button :class="{'active': currentTab === 'pending'}" @click="currentTab = 'pending'">Pendientes</button>
  <button :class="{'active': currentTab === 'completed'}" @click="currentTab = 'completed'">Completados</button>

  <div>
    <ul>
      <li v-for="todo in getTodosByTab" :key="todo.id" :class="{'completed': todo.completed}" @dblclick="toggleTodo(todo.id)">
        {{ todo.text }}
      </li>
    </ul>
  </div>

  <button @click="isOpen=true">Crear Todo</button>

  <modal v-if="isOpen" @on:close="isOpen = false">
    <template v-slot:header>
      <h1>Nueva tarea</h1>
    </template>
    <template v-slot:body>
      <form @submit.prevent="createTodo(newTodoText); isOpen=false">
          <input type="text" placeholder="nueva tarea" v-model="newTodoText">
          <br>
          <br>
          <button type="submit">
            Crear
          </button>
      </form>
    </template>
  </modal>
</template>

<script>
import useTodos from "../composables/useTodos";
import Modal from "../components/Modal.vue";
import { ref } from 'vue';

export default {
  components: { Modal },
  setup() {
    const {currentTab, toggleTodo, pending, getTodosByTab, createTodo} = useTodos();

    return {
      currentTab, toggleTodo, pending, getTodosByTab,
      createTodo,

      isOpen: ref(false),
      newTodoText: ref(''),
    }
  }

}
</script>

<style scoped>
  div {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  ul {
    width: 300px;
    text-align: left;
  }
  li {
    cursor:pointer;
  }
  .active {
    background-color: #2c3e50;
    color: white;
  }

  .completed {
    text-decoration: line-through;
  }
</style>