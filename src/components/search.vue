<template>
  <label class="vm-search position-relative d-flex" for="search">
    <i aria-hidden="true" class="vm-search-icon"></i>
    <input  type="text"
            v-model="query"
            @keyup="handleSearch" />
    <i aria-hidden="true" class="vm-search-close" @click="resetInput"></i>
  </label>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Search',
  setup(){
    const query = ref('');
    const store = useStore();

    const handleSearch = () => store.dispatch('searchVoices', query.value);

    const resetInput = () => {
      query.value = '';
      store.dispatch('searchVoices');
    }

    return { query, handleSearch, resetInput }
  }
};
</script>

<style  scoped>
.vm-search {
  background-color: #000;
  border-radius: 25px;
  height: 32px;
  min-width: 230px;
  padding: 0 32px;
}

.vm-search-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background-image: url('./../assets/search.svg');
  background-size: cover;
}

.vm-search input { flex: 1; }

.vm-search .vm-search-close::before {
  content: '';
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background-image: url('./../assets/search-close.svg');
  background-size: cover;
}
</style>
