<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <mcv-validation-errors 
            v-if="validationErrors" 
            :validationErrors="validationErrors" 
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input 
                  type="text" 
                  class="form-control form-control-lg"
                  v-model="form.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>

              <fieldset class="form-group">
                <input 
                  type="text" 
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea 
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="Short bio about you"
                />
              </fieldset>

              <fieldset class="form-group">
                <input 
                  type="text" 
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="Email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input 
                  type="password" 
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="Password"
                />
              </fieldset>
              <button 
                type="submit" 
                class="btn btn-lg btn-primary pull-xs-right" 
                :disabled="isSubmitting"
              >
                Update settings
              </button>
            </fieldset>
          </form>
          <hr/>
          <button 
            type="text"
            class="btn btn-outline-danger" 
            @click="logout"
          >
            Or click here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getterTypes as authGetterTypes, actionTypes as authActionTypes } from '@/store/modules/auth'
import McvValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'McvSettings',
  components: {
    McvValidationErrors
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.settings.isSubmitting,
      validationErrors: state => state.settings. validationErrors
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    form() {
      return {
        user: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit', this.form)
      this.$store.dispatch(authActionTypes.updateCurrentUser, {currentUserInput: this.form})
    },
    logout() {
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({name: 'GlobalFeed'})
      })
    }
  }
}
</script>