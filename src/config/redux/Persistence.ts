import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import { rootReducer } from './RootReducer'
import thunk from 'redux-thunk'

const persistenceConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistenceConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

export { store, persistor }
