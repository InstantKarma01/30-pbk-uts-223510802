<template>
    <div>
      <h1>Photos in Album</h1>
      <ul>
        <li v-for="photo in photos" :key="photo.id">
          <img :src="photo.thumbnailUrl" @click="showFullImage(photo.url)" />
        </li>
      </ul>
      <div v-if="selectedPhoto" class="modal" @click="closeModal">
        <img :src="selectedPhoto" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        photos: [],
        selectedPhoto: null
      };
    },
    created() {
      fetch(`https://jsonplaceholder.typicode.com/albums/${this.id}/photos`)
        .then(response => response.json())
        .then(photos => {
          this.photos = photos.slice(0, 6); // Only get 6 photos
        });
    },
    methods: {
      showFullImage(url) {
        this.selectedPhoto = url;
      },
      closeModal() {
        this.selectedPhoto = null;
      }
    }
  };
  </script>
  
  <style scoped>
  img {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal img {
    max-width: 90%;
    max-height: 90%;
  }
  </style>
  