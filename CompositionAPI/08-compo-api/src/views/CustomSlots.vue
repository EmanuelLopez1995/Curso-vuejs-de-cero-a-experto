<template>
  <h1>Aprendiendo Slots</h1>
  <button @click="isOpen = true">Abrir Modal</button>

  <Modal v-if="isOpen" title="Hola mundo" @on:close="closeModal">
      <template v-slot:header>
          <h2>Titulo del modal</h2>
      </template>
      <template v-slot:footer>
          <button @click="closeModal">Salir</button>
      </template>
      <template v-slot:body>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, in! Illum qui</p>
      </template>
      <template v-slot:exposed="{newTitle}">
        {{ newTitle }}
      </template>
</Modal>
</template>

<script>
import Modal from "../components/Modal.vue";
import { ref } from "vue";

export default {
    components: {
        Modal
    },
    setup() {

        const isOpen = ref(false);
        return {
            isOpen,
            openModal: () => isOpen.value = true,
            closeModal: () => isOpen.value = false
        }
    }
}
</script>

<style scoped>

</style>