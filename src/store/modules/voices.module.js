import voicesData from '@/data/voices.json';

const state = { 
    voices: [],
    favVoices: []
};

const getters = { 
    voicesList: state => state.voices,
    categories: () => {
        const categories = voicesData.map(voice => voice.tags[0]);
        const uniqueCategories = categories.filter((item, index) => categories.indexOf(item) === index);
        uniqueCategories.unshift('all');
        return uniqueCategories;
    },
    favVoices: state => state.favVoices
};

const mutations = { 
    setVoices: (state, voices) => (
        state.voices = voices
    ),

    selectVoice(state, id) {
        state.voices.forEach(voice => {
            voice.isSelected = false;
            if (voice.id === id) { 
                voice.isSelected = true;
            }
        })
    },
    
    favVoice(state, id) {
        state.voices.forEach(voice => {
            if (voice.id === id) { 
                voice.isFav = voice.isFav ? false : true;
            }
        })
        state.favVoices = state.voices.filter(voice => voice.isFav === true);
    },

    filterVoices(state, tag) {
        if (tag === 'all') {
            state.voices = voicesData;
        } else {
            state.voices = voicesData.filter(voice => voice.tags[0] === tag);
        }
    },

    sortVoices(state, order) {
        if (order === 'ascending') {
            state.voices.sort((a, b) => (a.name > b.name ? 1 : -1));
        } else {
            state.voices.sort((a, b) => (a.name > b.name ? -1 : 1));
        }
    },

    searchVoice(state, query) {
        state.voices = voicesData.filter(voice => voice.name.toLowerCase().match(query.toLowerCase()))
    }
};

const actions = { 
    fetchVoices({commit}){
      commit("setVoices", voicesData);
    },

    selectVoice({ commit }, id) {
        commit('selectVoice', id);
    },

    favVoice({ commit }, id) {
        commit('favVoice', id);
    },

    filterVoices({commit}, tag) {
        commit('filterVoices', tag);
    },

    sortVoices({commit}, order) {
        commit('sortVoices', order);
    },

    searchVoice({commit}, query) {
        commit('searchVoice', query);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}