<template src="./Julia.tmpl.html"></template>

<script>
export default {
  name: 'Julia',
  data: function () {
    return {
      api: 'http://www.reddit.com/r/new.json?limit=50',
      apiCount: 'http://www.reddit.com/r/new.json?count',
      title: 'Fractal Julia',
      loading: false,
      btnAdd: {
        txt: 'Добавить фильм'
      },
      uploadFiles: [],
      cover: '',
      posts: [],
      kinotekaItem: {
        id: null,
        name: 'Новый фильм',
        content: ''
      },
      isShowForm: false
    }
  },
  methods: {
    getPosts: function () {
      this.$http.get(this.api).then(function (response) {
        let data = response.data.data
        console.log(data)
        this.posts = data.children.slice()
        this.loading = true
      }, function (error) {
        console.log(error)
        this.loading = true
      })
    },
    getCountPosts: function () {
      // let vm = this
      this.$http.get(this.apiCount).then(function (response) {
        let data = response.data.data
        console.log(data)
        // let data = response.data.data
        // console.log(data.children)
        // vm.posts = data.children.slice()
        this.loading = true
      }, function (error) {
        console.log(error)
        this.loading = true
      })
    },
    readMore: function (item) {
      console.log(item)
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
    this.getCountPosts()
    this.getPosts()
  },
  computed: {
    isValid: function () {
      return (this.kinotekaItem.name !== '') && (this.kinotekaItem.content !== '')
    }
  }
}
</script>

<style lang="scss" src="./styles.scss" scoped></style>
