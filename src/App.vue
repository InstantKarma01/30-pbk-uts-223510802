<template>
  <div class="container">
    <h1>Daftar Kegiatan</h1>
    <form @submit.prevent="addActivity">
      <input type="text" v-model="newActivity" placeholder="Tambahkan kegiatan baru">
      <button type="submit">Tambah</button>
    </form>
    <ul>
      <li v-for="(activity, index) in filteredActivities" :key="index">
        <input type="checkbox" v-model="activity.done">
        <span :class="{ done: activity.done }">{{ activity.text }}</span>
        <button @click="deleteActivity(index)">Batal</button>
      </li>
    </ul>
    <div class="filter">
      <label>
        <input type="checkbox" v-model="showUndoneOnly">
        Tampilkan hanya kegiatan yang belum selesai
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [],
      newActivity: '',
      showUndoneOnly: false
    }
  },
  methods: {
    addActivity() {
      this.activities.push({ text: this.newActivity, done: false });
      this.newActivity = '';
    },
    deleteActivity(index) {
      this.activities.splice(index, 1);
    }
  },
  computed: {
    filteredActivities() {
      if (this.showUndoneOnly) {
        return this.activities.filter(activity => !activity.done);
      } else {
        return this.activities;
      }
    }
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}

.container {
  max-width: 400px;
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
</style>