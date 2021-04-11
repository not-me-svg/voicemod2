import { createStore } from 'vuex';
import voicesData from '@/data/voices.json';

export default createStore({
  state: {
    voices: [],
    favVoices: [],
    filteredVoices: []
  },
  mutations: {
    setVoices(state, payload) {
      state.voices = payload;
    },

    setFilteredVoices(state, payload) {
      state.filteredVoices = payload
    }
  },
  actions: {
    fetchVoices({ commit }){
      commit("setVoices", voicesData);
    },

    filterVoices({ commit, state }, tag) {
      const filter = state.voices.filter(voice => voice.tags[0] === tag);
      if (tag) {
        if (tag === 'all') {
          commit('setFilteredVoices', state.voices)
        } else {
          commit('setFilteredVoices', filter)
        }
      } else {
        commit('setFilteredVoices', state.voices)
      }
    },

    sortVoices({ state }, order) {
      if (order === 'ascending') {
        state.filteredVoices.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        state.filteredVoices.sort((a, b) => (a.name > b.name ? -1 : 1));
      }
    },

    searchVoices({ commit, state }, query) {
      let filter;
      if (query) {
        const queryFormatted = query.toLowerCase();
        filter = state.voices.filter(voice => voice.name.toLowerCase().match(queryFormatted));
      } else {
        filter = state.voices;
      }
      commit('setFilteredVoices', filter)
    },

    selectVoice({ state }, id) {
      state.voices.forEach(voice => {
        voice.isSelected = false;
        if (voice.id === id) { 
          voice.isSelected = true;
        }
      })
    },
    
    favVoice({ state }, id) {
      state.voices.forEach(voice => {
        if (voice.id === id) { 
          voice.isFav = voice.isFav ? false : true;
        }
      })
      state.favVoices = voicesData.filter(voice => voice.isFav === true);
    }
  },
  getters: {
    voicesList(state) {
      return state.filteredVoices
    },
    categories: () => {
      const categories = voicesData.map(voice => voice.tags[0]);
      const uniqueCategories = categories.filter((item, index) => categories.indexOf(item) === index);
      uniqueCategories.unshift('all');
      return uniqueCategories;
    },
    favVoices: state => state.favVoices
  }
})
