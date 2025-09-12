<script setup lang="ts">
import IconEyeClosed from '@/assets/icons/IconEyeClosed.vue'
import IconEyeOpen from '@/assets/icons/IconEyeOpen.vue'
import IconMail from '@/assets/icons/IconMail.vue'
import IconExclamation from '@/assets/icons/IconExclamation.vue'
import IconPassword from '@/assets/icons/IconPassword.vue'
import IconCat from '@/assets/icons/IconCat.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const registerMode = ref(true);
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const showPassword = ref(true);
const showPasswordConfirm = ref(true);
const errorMessage = ref('');
const userStore = useUserStore()
const router = useRouter()

async function handleSubmit() {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value)) {
    errorMessage.value = 'Некорректный email';
    return;
  } else if (registerMode.value === true && password.value !== passwordConfirm.value) {
    errorMessage.value = 'Пароли не совпадают';
    return;
  } else if (password.value.length < 8) {
    errorMessage.value = 'Пароль должен быть длинее 8 символов';
    return;
  }

  errorMessage.value = '';
  const result = await userStore.auth(email.value, password.value, registerMode.value);
  if ('message' in result) errorMessage.value = result.message
  else router.push('/home')
}

</script>

<template>
  <main>
    <div class="left-block">
      <div class="title">
        <IconCat :width="'28px'" :height="'28px'" :color="'#90ff90'" />
        <p><b>Добро пожаловать в NekoNotes</b></p>
      </div>
      <div class="description">
        <span><b>NekoNotes</b> - это удобное приложение для создания и управления заметками.</span>
        <span>Создавайте, редактируйте и удаляйте заметки, чтобы оставаться в курсе важных событий.</span>
      </div>
    </div>
    <div class="right-block">
      <div class="title">
        <p><b>{{ registerMode ? "Зарегистрируйтесь в приложении" : "Войдите в приложение" }} для доступа к своим
            заметкам</b></p>
      </div>
      <form class="login-block" @submit.prevent="handleSubmit" novalidate>
        <div>
          <IconMail :width="'26px'" :height="'28px'" :color="'#fff'" />
          <input type="email" v-model="email" placeholder="Email">
        </div>
        <div>
          <IconPassword :width="'28px'" :height="'28px'" :color="'#fff'" />
          <input :type="showPassword ? 'password' : 'text'" v-model="password" placeholder="Пароль">
          <button class="eye" @click="showPassword = !showPassword" type="button" style="cursor: pointer;">
            <IconEyeOpen v-if="!showPassword" :width="'28px'" :height="'28px'" :color="'#fff'" />
            <IconEyeClosed v-else :width="'28px'" :height="'28px'" :color="'#fff'" />
          </button>
        </div>
        <div v-if="registerMode">
          <IconPassword :width="'28px'" :height="'28px'" :color="'#fff'" />
          <input :type="showPasswordConfirm ? 'password' : 'text'" v-model="passwordConfirm"
            placeholder="Подтвердите пароль">
          <button class="eye" @click="showPasswordConfirm = !showPasswordConfirm" type="button"
            style="cursor: pointer;">
            <IconEyeOpen v-if="!showPasswordConfirm" :width="'28px'" :height="'28px'" :color="'#fff'" />
            <IconEyeClosed v-else :width="'28px'" :height="'28px'" :color="'#fff'" />
          </button>
        </div>
        <button type="submit" style="cursor: pointer;">{{ registerMode ? 'Зарегистрироваться' : 'Войти' }}</button>
      </form>
      <div v-on:click="registerMode = !registerMode">
        <span v-if="!registerMode">Нет аккаунта? <a style="color: #ffff80; cursor:pointer">Зарегистрируйтесь</a></span>
        <span v-else>Есть аккаунт? <a style="color: #90ff90; cursor:pointer">Войдите</a></span>
      </div>
      <div v-if="errorMessage" class="error-message">
        <IconExclamation :width="'18px'" :height="'18px'" :color="'#ff6060'" />
        <span>{{ errorMessage }}</span>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
p {
  font-size: 20px;
}

.error-message {
  gap: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  color: #ff6060;
}

main {
  display: flex;
  width: 100%;
  height: 100vh;
  bottom: 0px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
}

.left-block {
  min-width: 300px;
  max-width: 400px;
  padding: 10px 30px 30px 30px;
  border-radius: 8px;

  @media screen and (max-width: 1100px) {
    display: none;
  }
}

.right-block {
  min-width: 300px;
  max-width: 400px;
  background-color: #303030;
  padding: 10px 30px 30px 30px;
  border-radius: 8px;

  @media screen and (max-width: 1100px) {
    display: none;
  }
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px
}

.description {
  gap: 15px;
  display: flex;
  flex-direction: column;
}

.login-block {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &>div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    &>input {
      width: 100%
    }

    &>svg {
      cursor: pointer
    }
  }

  input {
    padding: 10px;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: #282828;
    color: #fff;

    &:focus {
      background-color: #343434;
      color: #ffffff;
    }
  }

  button {
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: #282828;
    color: #fff;
  }
}

.eye {
  background-color: transparent !important;
  border: none;
  padding: 5px 0px 0px 0px !important;
}
</style>
