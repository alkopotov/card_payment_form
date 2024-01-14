import { configureStore } from '@reduxjs/toolkit'
import logoReducer from './logoSlice'
import tableReducer  from './tableSlice'

export const store = configureStore({

  reducer: {
    logo: logoReducer,
    table: tableReducer,
  }
})