<template>
  <mcv-article-form
    :initialValues="initialValues"
    :errors="validationErrors"
    :isSubmitting="isSubmitting"
    @articleSubmit="onSubmit"
  ></mcv-article-form>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/createArticle'

export default {
  name: 'McvCreateArticle',
  components: {
    McvArticleForm
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting,
      validationErrors: state => state.createArticle.validationErrors
    })
  },
  methods: {
    onSubmit(articleInput) {
      this.$store.dispatch(actionTypes.createArticle, {articleInput})
      .then(article => {
        this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    }
  }
}
</script>