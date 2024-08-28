<template>
  <div class="home">
    <h1>Reactive vs ref</h1>
    <h3>{{ ironMan }}</h3>
    <h3>{{ hulk }}</h3>

    <button @click="changeIronman">Cambiar IronMan</button>
    <button @click="changeHulk">Cambiar IronMan</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'Home',

  setup() {
    const ironMan = ref({name: 'Tony', age: 50});
    const hulk = reactive({name: 'Bruce', age: 50});

    return {
      ironMan, hulk,

      changeIronman: () => {
        ironMan.value.name = 'Tony Stark';
        ironMan.value.age = 55;
      },
      changeHulk: () => {
        hulk.name = 'Bruce Banner';
        hulk.age = 55;
      }
    }
  }
}
</script>
