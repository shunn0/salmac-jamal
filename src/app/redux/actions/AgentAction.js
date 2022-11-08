import { apiUrl } from 'app/utils/constant'
import axios from 'axios'

export const AGENT_LIST_DATA_INIT = 'AGENT_LIST_DATA_INIT'
export const AGENT_LIST_DATA = 'AGENT_LIST_DATA'
export const AGENT_LIST_DATA_ERROR = 'AGENT_LIST_DATA_ERROR'
export const AGENT_LIST_DATA_RESET = 'AGENT_LIST_DATA_RESET'

export const ADD_EDIT_DELETE_AGENT_DATA_INIT = 'ADD_EDIT_DELETE_AGENT_DATA_INIT'
export const ADD_EDIT_DELETE_AGENT_DATA = 'ADD_EDIT_DELETE_AGENT_DATA'
export const ADD_EDIT_DELETE_AGENT_DATA_ERROR = 'ADD_EDIT_DELETE_AGENT_DATA_ERROR'
export const ADD_EDIT_DELETE_AGENT_DATA_RESET = 'ADD_EDIT_DELETE_AGENT_DATA_RESET'


export const addEditAgentReset=()=>{
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_AGENT_DATA_RESET
        });
    }
}
export const addEditAgent = (formData,type) => {
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_AGENT_DATA_INIT
        });
        axios[type](apiUrl + '/server', formData)
            .then((res) => {
                dispatch({
                    type: ADD_EDIT_DELETE_AGENT_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                dispatch({
                    type: ADD_EDIT_DELETE_AGENT_DATA_ERROR,
                    payload: { data: err && err.response && err.response.data ? err.response.data : err , status: 'error' },
                })
            })
    }
}
export const deleteAgent = (id) => {
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_AGENT_DATA_INIT
        });
        axios.delete(apiUrl + '/server/agent'+id)
            .then((res) => {
                dispatch({
                    type: ADD_EDIT_DELETE_AGENT_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                dispatch({
                    type: ADD_EDIT_DELETE_AGENT_DATA_ERROR,
                    payload: { data: err && err.response && err.response.data ? err.response.data : err , status: 'error' },
                })
            })
    }
}
export const getAgentListReset=()=>{
    return (dispatch) => {
        dispatch({
            type: AGENT_LIST_DATA_RESET
        });
    }
}
export const getAgentList = () => (dispatch) => {
    dispatch({
        type: AGENT_LIST_DATA_INIT
    })
    axios.get(apiUrl + '/server/all').then((res) => {
        dispatch({
            type: AGENT_LIST_DATA,
            payload: { data: res.data, status: 'ok' },
        })
    })
        .catch((err) => {
            dispatch({
                type: AGENT_LIST_DATA_ERROR,
                payload: { data: err && err.response && err.response.data ? err.response.data : err , status: 'error' },
            })
        })
}