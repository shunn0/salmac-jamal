import { apiUrl } from 'app/utils/constant'
import axios from 'axios'

export const SERVER_LIST_DATA = 'SERVER_LIST_DATA'
export const RUN_CMD_DATA = 'RUN_CMD_DATA'
export const RUN_UPLOAD_FILE_DATA = 'RUN_UPLOAD_FILE_DATA'
export const RUN_UPLOAD_ERROR = 'RUN_UPLOAD_ERROR'

export const runScriptCmd = (cmdData) => (dispatch) => {
    console.log(cmdData);
    axios.post(apiUrl + '/runmulticmd', cmdData).then((res) => {
        dispatch({
            type: RUN_CMD_DATA,
            payload: { data: res.data, status: 'ok' },
        })
    })
    .catch((err) => {
        dispatch({
            type: RUN_UPLOAD_ERROR,
            payload: { data: err, status: 'error' },
        })
    })
}
export const runScriptFromFile = (formData, onUploadProgress) => {
    return (dispatch) => {
        axios
            .post(apiUrl + '/runscript', formData, { onUploadProgress })
            .then((res) => {
                dispatch({
                    type: RUN_UPLOAD_FILE_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                dispatch({
                    type: RUN_UPLOAD_ERROR,
                    payload: { data: err, status: 'error' },
                })
            })
    }
}

export const getServersList = () => (dispatch) => {
    console.log("!!!!!!!!!!!!!!!!!!!");
    axios.get(apiUrl + '/server/all').then((res) => {
        dispatch({
            type: SERVER_LIST_DATA,
            payload: { data: res.data, status: 'ok' },
        })
    })
        .catch((err) => {
            dispatch({
                type: RUN_UPLOAD_ERROR,
                payload: { data: err, status: 'error' },
            })
        })
}