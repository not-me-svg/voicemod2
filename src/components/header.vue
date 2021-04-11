<template>
  <div class="header position-sticky">
    <div class="header-container d-flex">
      <div class="header-search">
        <Search />
      </div>
      <div class="header-filters d-flex">
        <div class="header-filters_filter">
          <Select :icon="require('@/assets/filter.svg')"
                  :options="categories"
                  :defaultOption="categories[0]"
                  v-on:select="filterVoices($event)" />
        </div>
        <div class="header-filters_filter">
          <Select :icon="require('@/assets/order.svg')"
                  :options="orderOptions"
                  :defaultOption="orderOptions[0]"
                  v-on:select="sortVoices($event)" />
        </div>

        <Button class="header-filters_randomize-btn"
                :icon="require('@/assets/button-random.svg')"
                v-on:onCLick="randomize" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Search from '@/components/search';
import Select from '@/components/select';
import Button from '@/components/button';

export default {
  name: 'Header',
  components: {
    Search,
    Select,
    Button
  },
  data() {
    return {
      orderOptions: ['ascending', 'descending'],
    }
  },
  computed: {
    ...mapGetters(["voicesList", "categories"]),
  },
  methods: {
    ...mapActions(["filterVoices", "sortVoices", "selectVoice", "handleSearch"]),

    randomize() {
      const rndm = Math.floor(Math.random() * (this.voicesList.length - 0)) + 0;
      this.selectVoice(this.voicesList[rndm].id);
      const item = document.getElementById(`${this.voicesList[rndm].id}`);
      item.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.header {
  z-index: 3;
  top: 0;
  background-color: #1b1b1b;
  box-shadow: -1px -1px 8px 2px #1b1b1b;
}

.header-container { 
  flex-direction: column;
}

@media (min-width: 768px) {
  .header-container {
    padding: 16px 0;
    flex-direction: row;
    justify-content: space-between;
  }
}

.header-search { padding: 16px; }

@media (min-width: 768px) {
  .header-search { padding: 0; }
}

.header-filters {
    justify-content: space-around;
    padding: 16px;
    flex-direction: column;
}

@media (min-width: 768px) {
  .header-filters {
      padding: 0;
      flex-direction: row;
  }
}

.header-filters_filter:not(:last-child) { margin: 0 0 16px 0; }

@media (min-width: 768px) {
  .header-filters_filter:not(:last-child) { margin: 0 36px 0 0; }
}

.header-filters_randomize-btn {
  background: #000;
  width: 100%;
}

@media (min-width: 768px) {
  .header-filters_randomize-btn { 
    background: transparent;
    width: 32px; 
  }
}

.header-filters_randomize-btn:hover { background: #000; }

.header-filters_randomize-btn_icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%) translateX(-50%);
  width: 24px;
  height: 24px;
  background-image: url('./../assets/button-random.svg');
  background-size: cover;
}
</style>
