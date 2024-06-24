import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    users: [],
    selectedUser: null,
    albums: [],
    photos: [],
  }),
  actions: {
    async fetchUsers() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      this.users = await response.json();
      this.selectedUser = this.users[0];
    },
    async fetchTodos() {
      if (this.selectedUser) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${this.selectedUser.id}`);
        this.todos = await response.json();
      }
    },
    async fetchPosts() {
      if (this.selectedUser) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser.id}`);
        this.posts = await response.json();
      }
    },
    async fetchAlbums() {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      this.albums = await response.json();
    },
    async fetchPhotos(albumId) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      this.photos = await response.json();
    }
  }
});
