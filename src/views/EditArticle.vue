<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-article-form
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    ></mcv-article-form>
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/editArticle'
import McvLoading from '@/components/Loading.vue'

export default {
  name: 'McvEditArticle',
  components: {
    McvArticleForm,
    McvLoading
  },
  computed: {
    ...mapState({
      isLoading: state => state.updateArticle.isLoading,
      article: state => state.updateArticle.article,
      isSubmitting: state => state.updateArticle.isSubmitting,
      validationErrors: state => state.updateArticle.validationErrors
    }),
    initialValues() {
      if (!this.article) {
        return null
      }

      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  moumted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug
    })
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug
      this.$store.dispatch(actionTypes.updateArticle, {articleInput, slug})
      .then(article => {
        this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    }
  }
}
</script>