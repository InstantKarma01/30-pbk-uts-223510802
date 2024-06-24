<template>
    <div>
      <h1>Albums</h1>
      <ul>
        <li v-for="album in albums" :key="album.id">
          <router-link :to="'/albums/' + album.id">{{ album.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        albums: []
      };
    },
    created() {
      fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(albums => {
          this.albums = albums.slice(0, 6); // Only get 6 albums
        });
    }
  };
  </script>
  