<template>
  <div class="loading-page">
    <div>
      <q-spinner-ios color="white" size="7rem" />
      <p class="text-white text-center">{{title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title'],
  }
</script>
