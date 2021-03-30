<template>
  <div  v-if="voice" class="voice" :class="{'voice--fav': voice.isFav, 'voice--selected': voice.isSelected}">
    <div class="voice-wrapper position-relative d-flex flex-column align-items-center">
      <div class="voice-fav-icon position-absolute" @click="favVoice(voice.id)"></div>
          <div class="voice-image position-relative" @click="selectVoice(voice.id)">
            <img :src="require(`./../assets/${ voice.icon }`)" :alt="voice.name" class="position-relative"/>
          </div>
          <h6 class="voice-name">{{ voice.name }}</h6>
      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'Voice',
  props: {
    voice: Object,
    isSelected: Boolean,
    isFav: Boolean,
  },
  methods: {
    ...mapActions(["selectVoice", "favVoice"])
  }
};
</script>

<style scoped>
  .voice { cursor: pointer; }

  .voice .voice-wrapper {
    width: max-content;
    margin: 0 auto;
  }

  /* Voice image */
  .voice .voice-image {
    width: 113px;
    height: 113px;
    border-radius: 100%;
    overflow: hidden;
    background: #d2d2d2;
  }

  .voice .voice-image img { z-index: 1; }

  /* Used this ::before to avoid black bg during transition to white from linear-gradient */
  .voice .voice-image::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
    background: rgb(0,197,255);
    background: linear-gradient(29deg, rgba(0,197,255,1) 0%, rgba(1,228,255,1) 100%);
  }

  .voice:hover .voice-image { background: #fff; }

  .voice.voice--selected .voice-image::before { opacity: 1; }

  /* Voice fav icon */
  .voice .voice-fav-icon {
    top: 0;
    right: 0;
    z-index: 2;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: #fff;
    opacity: 0;
    transition: opacity;
  }

  .voice .voice-fav-icon::before {
    content: '';
    background: url('./../assets/voice-favourite-off.svg') no-repeat 100%;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .voice:hover .voice-fav-icon {
    opacity: 1;
    transition: opacity .1s;
  }

  .voice.voice--fav .voice-fav-icon::before {
    background: url('./../assets/voice-favourite.svg') no-repeat 100%;
  }

  /* Voice name */
  .voice .voice-name {
    font-weight: 500;
    font-size: 0.875rem;
    margin-top: 4px;
    color: #d2d2d2;
  }

  .voice:hover .voice-name { color: #fff; }

  .voice.voice--selected .voice-name { color: rgb(0,197,255); }
</style>
