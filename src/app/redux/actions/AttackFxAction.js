import { apiUrl } from 'app/utils/constant'
import axios from 'axios'

export const ATTACKFX_LIST_DATA_INIT = 'ATTACKFX_LIST_DATA_INIT'
export const ATTACKFX_LIST_DATA_SUCCESS = 'ATTACKFX_LIST_DATA_SUCCESS'
export const ATTACKFX_LIST_DATA_RESET = 'ATTACKFX_LIST_DATA_RESET'
export const ATTACKFX_LIST_DATA_ERROR = 'ATTACKFX_LIST_DATA_ERROR'
export const GET_ATTACKFX_DATA = 'GET_ATTACKFX_DATA'
export const GET_ATTACKFX_DATA_RESET = 'GET_ATTACKFX_DATA_RESET'

export const DO_ATTACKFX_ACTION_INIT = 'DO_ATTACKFX_ACTION_INIT'
export const DO_ATTACKFX_ACTION = 'DO_ATTACKFX_ACTION'
export const DO_ATTACKFX_ACTION_ERROR = 'DO_ATTACKFX_ACTION_ERROR'
export const DO_ATTACKFX_ACTION_RESET = 'DO_ATTACKFX_ACTION_RESET'

export const GET_ATTACKFX_CATEGORY_INIT = 'GET_ATTACKFX_CATEGORY_INIT'
export const GET_ATTACKFX_CATEGORY_RESET = 'GET_ATTACKFX_CATEGORY_RESET'
export const GET_ATTACKFX_CATEGORY_SUCCESS = 'GET_ATTACKFX_CATEGORY_SUCCESS'
export const GET_ATTACKFX_CATEGORY_ERROR = 'GET_ATTACKFX_CATEGORY_ERROR'

export const getAttackFxCategoriesReset = () => {
    return (dispatch) => {
        dispatch({
            type: GET_ATTACKFX_CATEGORY_RESET,
        })
    }
}
export const getAttackFxCategories = () => (dispatch) => {
    dispatch({
        type: GET_ATTACKFX_CATEGORY_INIT,
    })
    axios
        .get(apiUrl + '/attackfx/category')
        .then((res) => {
            dispatch({
                type: GET_ATTACKFX_CATEGORY_SUCCESS,
                payload: { data: res.data, status: 'ok' },
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_ATTACKFX_CATEGORY_ERROR,
                payload: {
                    data: err && err.data ? err.data : err,
                    status: 'error',
                },
            })
        })
}

export const getAttackFxReset = () => {
    return (dispatch) => {
        dispatch({
            type: GET_ATTACKFX_DATA_RESET,
        })
    }
}
export const doAttackFxActionReset = () => {
    return (dispatch) => {
        dispatch({
            type: DO_ATTACKFX_ACTION_RESET,
        })
    }
}
export const getAttackFxById = (id, customUrl) => {
    const url = customUrl
        ? apiUrl + '/attackfx/' + customUrl
        : apiUrl + '/attackfx/' + id
    return (dispatch) => {
        dispatch({
            type: DO_ATTACKFX_ACTION_INIT,
        })
        axios
            .get(url)
            .then((res) => {
                dispatch({
                    type: GET_ATTACKFX_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                dispatch({
                    type: DO_ATTACKFX_ACTION_ERROR,
                    payload: {
                        data: err && err.response ? err.response.data : err,
                        status: 'error',
                    },
                })
            })
    }
}
export const doAttackFxAction = (formData, queryData, type) => {
    let newUrl = apiUrl
    if (type === 'put' || type === 'get') {
        newUrl = apiUrl + '/attackfx/' + queryData.id
    } else {
        newUrl = apiUrl + '/attackfx'
    }
    return (dispatch) => {
        dispatch({
            type: DO_ATTACKFX_ACTION_INIT,
        })
        axios({
            method: type,
            url: newUrl,
            data: formData,
        })
            .then((res) => {
                dispatch({
                    type: DO_ATTACKFX_ACTION,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: DO_ATTACKFX_ACTION_ERROR,
                    payload: {
                        data: err && err.response ? err.response.data : err,
                        status: 'error',
                    },
                })
            })
    }
}
export const doAttackFxActionByScript = (url) => {
    let newUrl = apiUrl + url
    return (dispatch) => {
        dispatch({
            type: DO_ATTACKFX_ACTION_INIT,
        })
        axios({
            method: 'post',
            url: newUrl,
        })
            .then((res) => {
                dispatch({
                    type: DO_ATTACKFX_ACTION,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: DO_ATTACKFX_ACTION_ERROR,
                    payload: {
                        data: err && err.response ? err.response.data : err,
                        status: 'error',
                    },
                })
            })
    }
}
export const deleteAttackFx = (id) => {
    return (dispatch) => {
        dispatch({
            type: DO_ATTACKFX_ACTION_INIT,
        })
        axios
            .delete(apiUrl + '/attackfx/' + id)
            .then((res) => {
                dispatch({
                    type: DO_ATTACKFX_ACTION,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                dispatch({
                    type: DO_ATTACKFX_ACTION_ERROR,
                    payload: {
                        data:
                            err && err.response && err.response.data
                                ? err.response.data
                                : err,
                        status: 'error',
                    },
                })
            })
    }
}
export const getAttackFxListReset = () => {
    return (dispatch) => {
        dispatch({
            type: ATTACKFX_LIST_DATA_RESET,
        })
    }
}
export const getAttackFxList = () => (dispatch) => {
    dispatch({
        type: ATTACKFX_LIST_DATA_INIT,
    })
    axios
        .get(apiUrl + '/attackfx/all')
        .then((res) => {
            console.log(res)
            dispatch({
                type: ATTACKFX_LIST_DATA_SUCCESS,
                payload: { data: res.data, status: 'ok' },
            })
        })
        .catch((err) => {
            dispatch({
                type: ATTACKFX_LIST_DATA_ERROR,
                payload: {
                    data: err && err.data ? err.data : err,
                    status: 'error',
                },
            })
        })
}
