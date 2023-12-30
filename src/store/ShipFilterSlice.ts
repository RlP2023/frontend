import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name_filter: ''
}

const ShipListFilter = createSlice({
    name: 'shipFilter',
    initialState: initialState,
    reducers: {
        saveFilter: (state, action) => {
            console.log(action)
            state.name_filter = action.payload
        },
    }
})

export const { saveFilter } = ShipListFilter.actions
export default ShipListFilter.reducer