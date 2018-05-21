<template>
<div class="blog">
  <div class="title">
    <h1>{{ title }}</h1>
    <div class="title__links">
      <button @click="showForm">
        <span>{{ btnAdd.txt }}</span>
      </button>
    </div>
  </div>
  <div class="blog__article-list">
    <ul>
      <li v-for="item in kinoteka" :key="item.id">
        <a @click.prevent="getFilm(item)"><span>{{ item.name }}</span></a>
      </li>
    </ul>
  </div>
  <div v-if="isShowForm" class="blog__form">
    <form class="form" method="post" @submit.prevent="save" enctype="multipart/form-data">
      <div class="dropbox">
        <div class="dropbox__image"><img :src="cover" /></div>
        <input class="dropbox__input" type="file" name="uploader" accept="image/*" multiple @change="changeUploader" />
      </div>
      <div class="form__title">{{ kinotekaItem.name }}</div>
      <div class="form__group">
        <div class="form__group-item">
          <label class="form__label">Название</label>
          <input class="form__input" type="text" v-model="kinotekaItem.name" />
        </div>
      </div>
      <div class="form__group">
        <div class="form__group-item">
          <label class="form__label">Описание</label>
          <textarea class="form__input form__input_txt" type="text" v-model="kinotekaItem.content"></textarea>
        </div>
      </div>
      <div class="form__group form__group_btn">
        <button class="btn" type="submit" :disabled="!isValid">Сохранить</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'Reddit',
  data: function () {
    return {
      api: '../api/',
      title: 'Кинотека',
      loading: false,
      btnAdd: {
        txt: 'Добавить фильм'
      },
      uploadFiles: [],
      cover: '',
      kinoteka: [],
      kinotekaItem: {
        id: null,
        name: 'Новый фильм',
        content: ''
      },
      isShowForm: false
    }
  },
  methods: {
    getFilms: function () {
      let vm = this
      this.$http.get(this.api).then(function (response) {
        let data = response.data
        vm.kinoteka = data.list.slice()
        this.loading = true
      }, function (error) {
        console.log(error)
        this.loading = true
      })
    },
    getFilm: function (film) {
      this.kinotekaItem = Object.assign({}, film)
      this.isShowForm = true
    },
    findFilmById: function (filmId) {
      let vm = this
      this.kinoteka.some(item => {
        if (item.id.toString() === filmId) {
          Object.assign(item, vm.kinotekaItem)
        }
      })
    },
    save: function () {
      let vm = this
      this.loading = false
      let params = {
        action: !vm.kinotekaItem.id ? 'create' : 'update'
      }

      this.$http.post(this.api, Object.assign(this.kinotekaItem, params)).then(response => {
        vm.loading = true
        let data = response.data
        console.log(data.message)
        this.findFilmById(this.kinotekaItem.id) // обновляю инфо у фильма
        // если нет id значит новый фильм
        if (!vm.kinotekaItem.id) {
          vm.kinotekaItem.id = data.filmId
          vm.kinoteka.push(vm.kinotekaItem)
          let formData = new FormData()
          formData.append('file', vm.uploadFiles[0])
          formData.append('filmId', data.filmId)
          vm.$http.post(vm.api + 'upload.service.php', formData).then(upload => {
            console.log(upload)
          })
        }
      }, error => {
        console.log(error)
        vm.loading = true
      })
    },
    closeForm: function () {
      this.isShowForm = false
    },
    showForm: function () {
      this.isShowForm = !this.isShowForm
      this.btnAdd.txt = this.isShowForm ? 'Закрыть форму' : 'Добавить фильм'
    },
    // реагирует на изменение загрузчика
    changeUploader: function (e) {
      this.uploadFiles = e.target.files || e.dataTransfer.files
      if (!this.uploadFiles.length) {
        return
      }
      this.createImage(this.uploadFiles[0])
    },
    // создает миниатюру загруженной обложки
    createImage: function (file) {
      let vm = this
      let fr = new FileReader()
      fr.onload = (e) => {
        vm.cover = e.target.result
      }
      fr.readAsDataURL(file)
    },
    // очищает загрузчик
    clearUploader: function (e) {
      this.cover = ''
    }
  },
  created: function () {
    this.getFilms()
  },
  computed: {
    isValid: function () {
      return (this.kinotekaItem.name !== '') && (this.kinotekaItem.content !== '')
    }
  }
}
</script>

<style lang="scss" src="./styles.scss" scoped></style>
