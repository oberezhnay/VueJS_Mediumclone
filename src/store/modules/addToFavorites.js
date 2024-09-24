import addToFavoritesApi from "@/api/addToFavorites"

export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] addToFavorites start',
  addToFavoritesSuccess: '[addToFavorites] addToFavorites success',
  addToFavoritesFailure: '[addToFavorites] addToFavorites failure'
}

export const actionTypes = {
  addToFavorites: '[addTofavorites] addToFavorites'
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {},
}

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addToFavoritesStart)
      const promise = isFavorited 
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)

      promise.then(article => {
        context.commit(mutationTypes.addToFavoritesSuccess, article)
        resolve(article)
      }).catch(() => {
        context.commit(mutationTypes.addToFavoritesFailure)
      })
    })
  }
}

export default {
  actions,
  mutations
}