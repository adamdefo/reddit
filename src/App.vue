<template>
  <div id="app" >
    <div id="note-main" class="note note--show" v-if="showNote">
      <div class="note__content">
        <div class="note__txt">
          <p><strong>GO TO HELL •</strong> Call <strong>or</strong> Txt <strong>(666) 666 6666</strong> <strong>•</strong> email <a href="mailto:fuckoff@ass.ru"><strong>fuckoff@ass.ru</strong></a></p>
          <span v-on:click="closeNote" class="note__close"></span>
        </div>
      </div>
    </div>
    <div class="layout">
      <navigation></navigation>
      <main class="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import Navigation from './components/navigation/Navigation'
export default {
  components: {
    'navigation': Navigation
  },
  name: 'app',
  data () {
    return {
      showNote: false
    }
  },
  methods: {
    closeNote: function () {
      this.showNote = false
    }
  }
}
</script>

<style lang="scss" src="./styles.scss"></style>
