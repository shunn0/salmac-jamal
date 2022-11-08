import { apiUrl } from 'app/utils/constant'
import axios from 'axios'

export const SCRIPT_LIST_DATA_INIT = 'SCRIPT_LIST_DATA_INIT'
export const SCRIPT_LIST_DATA = 'SCRIPT_LIST_DATA'
export const SCRIPT_LIST_DATA_ERROR = 'SCRIPT_LIST_DATA_ERROR'
export const SCRIPT_LIST_DATA_RESET = 'SCRIPT_LIST_DATA_RESET'
export const GET_SCRIPT_DATA = 'GET_SCRIPT_DATA'

export const ADD_EDIT_DELETE_SCRIPT_DATA_INIT =
    'ADD_EDIT_DELETE_SCRIPT_DATA_INIT'
export const ADD_EDIT_DELETE_SCRIPT_DATA = 'ADD_EDIT_DELETE_SCRIPT_DATA'
export const ADD_EDIT_DELETE_SCRIPT_DATA_ERROR =
    'ADD_EDIT_DELETE_SCRIPT_DATA_ERROR'
export const ADD_EDIT_DELETE_SCRIPT_DATA_RESET =
    'ADD_EDIT_DELETE_SCRIPT_DATA_RESET'
export const GET_SCRIPT_DATA_RESET = 'GET_SCRIPT_DATA_RESET'

export const getScriptReset = () => {
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_SCRIPT_DATA_RESET,
        })
    }
}
export const addEditScriptReset = () => {
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_SCRIPT_DATA_RESET,
        })
    }
}
export const getScriptById = (id) => {
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_SCRIPT_DATA_INIT,
        })
        axios
            .get(apiUrl + '/server/script/' + id)
            .then((res) => {
                dispatch({
                    type: GET_SCRIPT_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: ADD_EDIT_DELETE_SCRIPT_DATA_ERROR,
                    payload: {
                        data: err && err.response ? err.response.data : err,
                        status: 'error',
                    },
                })
            })
    }
}
export const addEditScript = (formData, queryData, type) => {
    console.log(queryData)
    let newUrl = apiUrl
    if (type === 'put' || type === 'get') {
        newUrl = apiUrl + '/server/script/' + queryData.id
    } else {
        newUrl = apiUrl + '/server/script'
    }
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_SCRIPT_DATA_INIT,
        })
        axios({
            method: type,
            url: newUrl,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((res) => {
                dispatch({
                    type: ADD_EDIT_DELETE_SCRIPT_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: ADD_EDIT_DELETE_SCRIPT_DATA_ERROR,
                    payload: {
                        data: err && err.response ? err.response.data : err,
                        status: 'error',
                    },
                })
            })
    }
}
export const deleteScript = (id) => {
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_SCRIPT_DATA_INIT,
        })
        axios
            .delete(apiUrl + '/server/script/' + id)
            .then((res) => {
                dispatch({
                    type: ADD_EDIT_DELETE_SCRIPT_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                dispatch({
                    type: ADD_EDIT_DELETE_SCRIPT_DATA_ERROR,
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
export const getScriptListReset = () => {
    return (dispatch) => {
        dispatch({
            type: SCRIPT_LIST_DATA_RESET,
        })
    }
}
export const getScriptList = () => (dispatch) => {
    dispatch({
        type: SCRIPT_LIST_DATA_INIT,
    })
    axios
        .get(apiUrl + '/server/script?pageNumber=1&pageSize=10')
        .then((res) => {
            dispatch({
                type: SCRIPT_LIST_DATA,
                payload: { data: res.data, status: 'ok' },
            })
        })
        .catch((err) => {
            dispatch({
                type: SCRIPT_LIST_DATA_ERROR,
                payload: {
                    data: err && err.data ? err.data : err,
                    status: 'error',
                },
            })
        })
}
