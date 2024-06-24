<template>
  <div class="container">
    <header>
      <nav>
        <router-link to="/todos" :class="{ active: currentRoute === '/todos' }">Todos</router-link>
        <router-link to="/posts" :class="{ active: currentRoute === '/posts' }">Posts</router-link>
        <router-link to="/albums" :class="{ active: currentRoute === '/albums' }">Albums</router-link>
      </nav>
    </header>
    <div class="user-selector">
      <label for="user-select">Pilih user:</label>
      <select id="user-select" v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user">{{ user.name }}</option>
      </select>
    </div>
    <router-view :selectedUser="selectedUser" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useMainStore } from './stores';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const mainStore = useMainStore();
    const { users, selectedUser } = storeToRefs(mainStore);

    onMounted(() => {
      mainStore.fetchUsers();
    });

    return {
      users,
      selectedUser,
      currentRoute: window.location.pathname,
    };
  }
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
li:last-child {
  border-bottom: none;
}
input[type="checkbox"] {
  margin-right: 10px;
}
button {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #3e8e41;
}
.filter {
  margin-top: 20px;
}
.user-selector {
  margin-bottom: 20px;
}
header {
  background-color: #4CAF50;
  color: white;
  padding: 10px 0;
  text-align: center;
  margin-bottom: 20px;
}
nav {
  display: flex;
  justify-content: center;
  gap: 10px;
}
nav a {
  background-color: transparent;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
}
nav a.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
