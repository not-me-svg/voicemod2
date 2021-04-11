<template>
  <div class="homepage position-relative">
    <div class="homepage-container">
      <section id="homepage-section--favs" class="homepage-section" v-if="favVoices.length">
        <div class="d-flex align-items-center">
          <h4 class="homepage-section_title_text text-uppercase">Favourite Voices</h4>
          <div class="homepage-section_title_line"></div>
        </div>

        <div class="homepage-voices-list">
          <Voice  v-for="voice in favVoices" :key="voice.id"
                  :voice="voice" />
        </div>
      </section>

      <section class="homepage-section">
        <div class="d-flex align-items-center">
          <h4 class="homepage-section_title_text text-uppercase">Pro Voices</h4>
          <div class="homepage-section_title_line"></div>
        </div>
        
        <div class="homepage-voices-list" v-if="voices.length">
          <Voice  v-for="voice in voices" :key="voice.id"
                  :voice="voice" :id="voice.id" />
        </div>
      </section>
    </div>

    <button v-if="scrollY > 800"
            @click="scrollTop"
            class="homepage-scrolltop position-fixed d-flex justify-content-center align-items-center">
      <img src="./../assets/select-arrow.svg" alt="Scroll to top" />
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Voice from '@/components/voice';

export default {
  name: 'HomePage',
  components: { Voice },
  setup(){
    const store = useStore();
    
    const scrollY = ref(0);

    const voices = computed(() => store.getters.voicesList);
    const favVoices = computed(() => store.getters.favVoices);

    const handleScroll = () => scrollY.value = window.scrollY;
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    onMounted(async () => {
        await store.dispatch('fetchVoices');
        await store.dispatch('filterVoices');

        window.addEventListener('scroll', handleScroll);
    })

    onUnmounted(() => window.removeEventListener('scroll', handleScroll));

    return { voices, favVoices, scrollY, scrollTop }
  }
};
</script>

<style scoped>
  .homepage-container { margin-top: 48px; }
  .homepage-section { padding: 0 56px; }
  .homepage-section_title_text {
    color: #808080;
    font-size: 1.125rem;
    font-weight: 500;
  }
  .homepage-section_title_line {
    flex: 1;
    height: 1px;
    background-color: #3e3d3d;
    margin-left: 8px;
  }
  .homepage-voices-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 36px;
    margin: 36px 0 36px 0;
  }

  @media (min-width: 768px) {
    .homepage-voices-list { grid-template-columns: repeat(4, 1fr); }
  }

  @media (min-width: 1200px) {
    .homepage-voices-list { grid-template-columns: repeat(6, 1fr); }
  }

  .homepage-scrolltop {
    bottom: 40px;
    right: -20px;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .homepage-scrolltop img { transform: rotate(180deg) translateX(50%); }

  @media (min-width: 768px) {
    .homepage-scrolltop { right: 40px; }
    .homepage-scrolltop img { transform: rotate(180deg) translateX(0); }
  }
</style>
