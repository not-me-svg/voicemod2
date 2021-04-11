import { createStore } from 'vuex';
import voicesData from '@/data/voices.json';

function filterByKeyword(list, query) {
  if (!query) return list;
  const queryFormatted = query.toLowerCase();
  return list.filter(voice => voice.name.toLowerCase().match(queryFormatted));
}

function filterByCategory(list, category) {
  if (!category || category === 'all') return list;
  return list.filter(voice => voice.tags[0] === category);
}

export default createStore({
  state: {
    voices: [],
    favVoices: [],
    filteredVoices: [],
    category: 'all',
    searchQuery: null
  },
  mutations: {
    setVoices(state, payload) {
      state.voices = payload;
    },

    setFilteredVoices(state, payload) {
      state.filteredVoices = payload;
    },

    setCategory(state, payload) {
      state.category = payload;
    },

    setsearchQuery(state, payload) {
      state.searchQuery = payload;
    }
  },
  actions: {
    fetchVoices({ commit }){
      commit('setVoices', voicesData);
    },

    filterVoices({ commit, state }, params) {
      commit('setCategory', params && params.category ? params.category : state.category);
      commit('setsearchQuery', (params && (params.query || params.query === '')) ? params.query : state.searchQuery);

      const filter = filterByCategory(
        filterByKeyword(
          state.voices, 
          state.searchQuery
        ), 
        state.category
      );
      
      commit('setFilteredVoices', filter);
    },

    sortVoices({ state }, order) {
      if (order === 'ascending') {
        state.filteredVoices.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        state.filteredVoices.sort((a, b) => (a.name > b.name ? -1 : 1));
      }
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
