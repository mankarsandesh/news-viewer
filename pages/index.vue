<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-3 gap-2"
    v-if="newsAllData.length > 0"
  >
    <div v-for="(data, index) in newsAllData" v-bind:key="index">
      <News
        v-bind="{
          ...data,
        }"
      />
    </div>
  </div>
  <div v-else class="text-gray-400 text-3xl text-center align-middle">
    No News found. Please Try Later...
  </div>
</template>

<script>
import News from "@/components/News/News.vue";
import { mapActions, mapState } from "vuex";
import axios from "axios";
import xml2js from "xml2js";
export default {
  data() {
    return {
      newsData: [],
      pageCount: 1,
    };
  },
  components: { News },

  mounted() {
    // Fetch News channel data
    axios
      .get(`https://www1.cbn.com/rss-cbn-articles-cbnnews.xml`)
      .then((response) => {
        this.parseXML(response.data).then((data) => {
          this.$store.commit("news/SET_NEWS", data);
          this.pageCount = data.length / 6;
        });
      });
  },
  methods: {
    //xml file data parsing
    parseXML(data) {
      return new Promise((resolve) => {
        var k = "";
        var arr = [],
          parser = new xml2js.Parser({
            trim: true,
            explicitArray: true,
          });
        parser.parseString(data, function (err, result) {
          var obj = result.rss.channel[0];
          for (k in obj.item) {
            var item = obj.item[k];
            console.log(item, "item");
            arr.push({
              title: item.title[0],
              link: item.link[0],
              pubDate: item.pubDate[0],
              description: item.description[0],
            });
          }
          resolve(arr);
        });
      });
    },
  },
  computed: {
    ...mapState("news", ["filteredNews", "searchWord", "news"]),
    newsAllData() {
      return this.searchWord ? this.filteredNews : this.news;
    },
  },
};
</script>
