<template>
  <div class="task-input my-list">
    <input v-model="title" placeholder="Title" type="text" />
    <input v-model="description" placeholder="Description" type="text" />
    <button @click="onAddTask">Add task</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: {
    onAddTask({ title }) {
      if (title === '') {
        alert('Your task must have a title! Сформулируйте задачу!');
        return false;
      }
      return true;
    },
  },
  setup(props, { emit }) {
    const title = ref('');
    const description = ref('');

    const onAddTask = () => {
      emit('onAddTask', { title: title.value, description: description.value });
    };

    return {
      title,
      description,
      onAddTask,
    };
  },
};
</script>

<style scoped>
.task-input {
  margin: 10px 0;
}
</style>
