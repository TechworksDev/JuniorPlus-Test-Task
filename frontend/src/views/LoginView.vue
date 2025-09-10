<script setup lang="ts">
import IconNotes  from '@icons/IconNotes.vue'
import IconEyeClosed  from '@icons/IconEyeClosed.vue'
import { useRouter } from "vue-router"
import IconEyeOpen  from '@icons/IconEyeOpen.vue'
// import { Eye as IconEyeOpen, EyeOff as IconEyeClosed } from "lucide-vue-next"
import {ref} from 'vue'

const registerMode = ref(false);
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const showPassword = ref(true);
const showPasswordConfirm = ref(true);
const router = useRouter()

function handleSubmit () {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value)) {
    alert('Email is not valid');
    return;
  }
  router.push("/home")
}

</script>

<template>
  <main>
    <div class="left-block">
      <div class="title">
        <IconNotes :width="'28px'" :height="'28px'" :color="'#fff'"/>
        <p><b>Добро пожаловать в NekoNotes</b></p>
      </div>
      <div class="description">
        <span><b>NekoNotes</b> - это удобное приложение для создания и управления заметками.</span>
        <span>Создавайте, редактируйте и удаляйте заметки, чтобы оставаться в курсе важных событий.</span>
      </div>
    </div>
    <div class="right-block">
      <div class="title">
        <p><b>Войдите в приложение для доступа к своим заметкам</b></p>
      </div>
      <form class="login-block" @submit.prevent="handleSubmit">
        <div>
          <input type="email" v-model="email" placeholder="Email">
        </div>
        <div>
          <input :type="showPassword ? 'password' : 'text'" v-model="password" placeholder="Пароль">
          <button class="eye" @click="showPassword = !showPassword" type="button" style="cursor: pointer;">
            <IconEyeOpen v-if="!showPassword" :width="'28px'" :height="'28px'" :color="'#fff'"/>
            <IconEyeClosed v-else :width="'28px'" :height="'28px'" :color="'#fff'"/>
          </button>
        </div>
        <div v-if="registerMode">
          <input :type="showPasswordConfirm ? 'password' : 'text'" v-model="passwordConfirm" placeholder="Подтвердите пароль">
          <button class="eye" @click="showPasswordConfirm = !showPasswordConfirm" type="button" style="cursor: pointer;">
            <IconEyeOpen v-if="!showPasswordConfirm" :width="'28px'" :height="'28px'" :color="'#fff'"/>
            <IconEyeClosed v-else :width="'28px'" :height="'28px'" :color="'#fff'"/>
          </button>
        </div>
        <button type="submit">{{registerMode ? 'Зарегистрироваться' : 'Войти'}}</button>
        <div v-on:click="registerMode = !registerMode" style="cursor: pointer">
          <span v-if="!registerMode">Нет аккаунта? <a style="color: #ffff80">Зарегистрируйтесь</a></span>
          <span v-else>Есть аккаунт? <a style="color: #90ff90">Войдите</a></span>
        </div>
      </form>
    </div>
  </main>
</template>

<style lang="scss">
  p{
    font-size: 20px;
  }
  main{
    display: flex;
    width: 100%;
    height: 100vh;
    bottom: 0px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 20px;
  }
  .left-block{
    width: 360px;
    background-color: #303030;
    padding: 20px;
    border-radius: 8px;
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
  .title{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px
  }
  .description{
    gap: 15px;
    display: flex;
    flex-direction: column;
  }
  .login-block{
    display: flex;
    flex-direction: column;
    gap: 15px;
    &>div{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      &>input{
        width: 100%
      }
      &>svg{
        cursor: pointer
      }
    }
    input{
      padding: 10px;
      border-radius: 8px;
      border: none;
      outline: none;
      background-color: #282828;
      color: #fff;
      &:focus{
        background-color: #343434;
        color: #ffffff;
      }
    }
    button{
      padding: 10px;
      border-radius: 8px;
      border: none;
      background-color: #282828;
      color: #fff;
    }
  }
  .eye{
    background-color: transparent !important;
    border: none;
    padding: 5px 0px 0px 0px !important;
  }
</style>
