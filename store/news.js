import Vue from "vue";
import { SET_NEWS, SEARCH } from "./mutation-types";

export const state = () => ({
  news: [],
  searchWord: null,
  filteredNews: [],
});

export const getters = {
  filteredNews: (state) => state.filteredNews,
  searchWord: (state) => state.searchWord,
};

export const mutations = {
  // SET NEWS DATA
  [SET_NEWS]: function (state, news) {
    Vue.set(state, "news", news);
  },
  // SEARCH NEWS TTITLE
  [SEARCH]: function (state, word) {
    if (!word || word === "{}") {
      state.searchWord = null;
      state.filteredNews = null;
    } else {
      state.searchWord = word;
      console.log(state.searchWord,"world");
      state.filteredNews = state.news.filter((data) => {
        return data.title.toLowerCase().includes(word);
      });
    }
  },
};
