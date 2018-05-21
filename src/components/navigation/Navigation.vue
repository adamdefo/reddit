<template>
  <header class="header">
    <!--<div class="header__logo">
      <a href="#/">
        <span class="logo">Система управления</span>
        <span class="slogan">Ресницы & Брови</span>
      </a>
    </div>-->
    <div class="header__nav">
      <nav class="nav">
        <ul>
          <li class="nav__li" v-for="link in navLinks" :key="link.id">
            <router-link :to="link.href" class="nav__link">{{ link.title }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      navLinks: [
        {
          title: 'Главная',
          href: '/'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  font-size: 3.5em;
  font-weight: 600;
  margin-bottom: 20px; 
}

.slogan {
  font-size: .75em;
  font-weight: 300;
  letter-spacing: .5em;
  text-transform: uppercase; 
}

.header {
  &__logo {
    padding: 40px 0;
    text-align: center;
    & a {
      color: #000000;
      text-decoration: none;
    }
  }
  &__nav {
    display: block;
    text-align: center;
  }
}

.nav {
  & ul {
    margin: 0;
    padding: 0;
  }
  &__li {
    display: inline-block;
    padding: 6px 13px;
    font-size: .75em;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  &__link {
    color: #000000;
    text-decoration: none;
    &:hover {
      color: #ff3c8b;
    }
  }
}
</style>