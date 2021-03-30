<template>
  <div class="homepage">
    <div class="homepage-container">
      <section v-if="favVoices.length" class="homepage-section">
        <div class="homepage-section_title d-flex align-items-center">
          <h4 class="homepage-section_title_text text-uppercase">Favourite Voices</h4>
          <div class="homepage-section_title_line"></div>
        </div>

        <div class="homepage-voices-list">
          <Voice  v-for="voice in favVoices" :key="voice.id"
                  :voice="voice" />
        </div>
      </section>

      <section class="homepage-section">
        <div class="homepage-section_title d-flex align-items-center">
          <h4 class="homepage-section_title_text text-uppercase">Pro Voices</h4>
          <div class="homepage-section_title_line"></div>
        </div>

        <div class="homepage-voices-list">
          <Voice  v-for="voice in voicesList" :key="voice.id"
                  :voice="voice" :id="voice.id" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Voice from '@/components/voice';

export default {
  name: 'HomePage',
  components: {
    Voice,
  },
  methods: {
    ...mapActions(["fetchVoices"])
  },
  computed: {
    ...mapGetters(["voicesList", "favVoices"]),
  },
  created() {
    this.fetchVoices()
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
</style>
