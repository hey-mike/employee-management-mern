import * as types from './actionTypes'


export const openDrawer = () => ({
    type: types.DOCKED_DRAWER,
    adjustWidth: "calc(100% - 250px)"
})

export const closeDrawer = () => ({
    type: types.UNDOCKED_DRAWER,
    adjustWidth : "100%"
})