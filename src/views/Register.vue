<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Have an account?
            </router-link>
          </p>
          <mcv-validation-errors 
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></mcv-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input 
                type="text" 
                class="form-control form-control-lg" 
                placeholder="Username"
                v-model="username"
              />
            </fieldset>

            <fieldset class="form-group">
              <input 
                type="text" 
                class="form-control form-control-lg" 
                placeholder="Email"
                v-model="email"
              />
            </fieldset>

            <fieldset class="form-group">
              <input 
                type="password" 
                class="form-control form-control-lg" 
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button 
              class="btn btn-lg btn-primary pull-xs-right" 
              :disabled="isSubmitting"
              >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvValidationErrors from '@/components/ValidationErrors.vue'
import { actionTypes } from '@/store/modules/auth'
export default {
  name: 'McvRegister',
  components: {
    McvValidationErrors
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
        email: this.email, 
        username: this.username,
        password: this.password
    })
    .then(() => {
      this.$router.push({name: 'globalFeed'})
    })
    }
  }
}
</script>
