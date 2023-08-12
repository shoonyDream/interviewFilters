import { createEvent, createStore } from "effector";

const uiStateStore = createStore({
  isLoaderShown: false
})

const showLoader = createEvent()
const hideLoader = createEvent()

uiStateStore
  .on(showLoader, (state) => ({ ...state, isLoaderShown: true }))
  .on(hideLoader, (state) => ({ ...state, isLoaderShown: false }))

export { showLoader, hideLoader, uiStateStore }