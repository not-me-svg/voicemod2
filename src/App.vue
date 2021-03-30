<template>
  <div id="app">
    <Header />
    <HomePage />
  </div>
</template>

<script>
import Header from '@/components/header';
import HomePage from '@/pages/HomePage';

export default {
  name: 'App',
  components: {
    Header,
    HomePage
  }
}
</script>
