import { apiUrl } from 'app/utils/constant'
import axios from 'axios'

export const SCRIPT_LIST_DATA_INIT = 'SCRIPT_LIST_DATA_INIT'
export const SCRIPT_LIST_DATA = 'SCRIPT_LIST_DATA'
export const SCRIPT_LIST_DATA_ERROR = 'SCRIPT_LIST_DATA_ERROR'
export const SCRIPT_LIST_DATA_RESET = 'SCRIPT_LIST_DATA_RESET'

export const ADD_EDIT_DELETE_SCRIPT_DATA_INIT = 'ADD_EDIT_DELETE_SCRIPT_DATA_INIT'
export const ADD_EDIT_DELETE_SCRIPT_DATA = 'ADD_EDIT_DELETE_SCRIPT_DATA'
export const ADD_EDIT_DELETE_SCRIPT_DATA_ERROR = 'ADD_EDIT_DELETE_SCRIPT_DATA_ERROR'
export const ADD_EDIT_DELETE_SCRIPT_DATA_RESET = 'ADD_EDIT_DELETE_SCRIPT_DATA_RESET'


export const addEditScriptReset=()=>{
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_SCRIPT_DATA_RESET
        });
    }
}
export const addEditScript = (formData,type) => {
    console.log(formData);
    let newUrl =apiUrl;
    if(type==="put" || type==="get"){
        newUrl= apiUrl + '/script/'+formData.id;
    }else{
        newUrl= apiUrl + '/script';
    }
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_SCRIPT_DATA_INIT
        });
        axios.post(newUrl, formData)
            .then((res) => {
                dispatch({
                    type: ADD_EDIT_DELETE_SCRIPT_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                dispatch({
                    type: ADD_EDIT_DELETE_SCRIPT_DATA_ERROR,
                    payload: { data: err, status: 'error' },
                })
            })
    }
}
export const deleteScript = (id) => {
    return (dispatch) => {
        dispatch({
            type: ADD_EDIT_DELETE_SCRIPT_DATA_INIT
        });
        axios.delete(apiUrl + '/server/script'+id)
            .then((res) => {
                dispatch({
                    type: ADD_EDIT_DELETE_SCRIPT_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                dispatch({
                    type: ADD_EDIT_DELETE_SCRIPT_DATA_ERROR,
                    payload: { data: err, status: 'error' },
                })
            })
    }
}
export const getScriptListReset=()=>{
    return (dispatch) => {
        dispatch({
            type: SCRIPT_LIST_DATA_RESET
        });
    }
}
export const getScriptList = () => (dispatch) => {
    dispatch({
        type: SCRIPT_LIST_DATA_INIT
    })
    axios.get(apiUrl + '/server/script?pageNumber=1&pageSize=10').then((res) => {
        dispatch({
            type: SCRIPT_LIST_DATA,
            payload: { data: res.data, status: 'ok' },
        })
    })
        .catch((err) => {
            dispatch({
                type: SCRIPT_LIST_DATA_ERROR,
                payload: { data: err, status: 'error' },
            })
        })
}