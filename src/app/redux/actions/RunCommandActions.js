import { apiUrl } from 'app/utils/constant'
import axios from 'axios'

export const RUN_CMD_DATA_INIT = 'RUN_CMD_DATA_INIT'
export const RUN_CMD_DATA = 'RUN_CMD_DATA'
export const RUN_CMD_DATA_RESET = 'RUN_CMD_DATA_RESET'
export const RUN_CMD_DATA_ERROR = 'RUN_CMD_DATA_ERROR'

export const RUN_UPLOAD_FILE_DATA_INIT = 'RUN_UPLOAD_FILE_DATA_INIT'
export const RUN_UPLOAD_FILE_DATA = 'RUN_UPLOAD_FILE_DATA'
export const RRUN_UPLOAD_FILE_DATA_ERROR = 'RRUN_UPLOAD_FILE_DATA_ERROR'
export const RUN_UPLOAD_FILE_DATA_RESET = 'RUN_UPLOAD_FILE_DATA_RESET'

export const AVAILABLE_OS_FILE_DATA_INIT = 'AVAILABLE_OS_FILE_DATA_INIT'
export const AVAILABLE_OS_FILE_DATA_SUCCESS = 'AVAILABLE_OS_FILE_DATA_SUCCESS'
export const AVAILABLE_OS_FILE_DATA_ERROR = 'AVAILABLE_OS_FILE_DATA_ERROR'
export const AVAILABLE_OS_FILE_DATA_RESET = 'AVAILABLE_OS_FILE_DATA_RESET'

export const runScriptCmdReset=()=>{
    return (dispatch) => {
        dispatch({
            type: RUN_CMD_DATA_RESET
        });
    }
}
export const runScriptCmd = (cmdData, selectedServer) => (dispatch) => {
    dispatch({
        type: RUN_CMD_DATA_INIT
    });
    axios.post(selectedServer + '/runmulticmd', cmdData).then((res) => {
        dispatch({
            type: RUN_CMD_DATA,
            payload: { data: res.data, status: 'ok' },
        })
    })
    .catch((err) => {
        dispatch({
            type: RUN_CMD_DATA_ERROR,
            payload: { data: err, status: 'error' },
        })
    })
}
export const runScriptFromFileReset=()=>{
    return (dispatch) => {
        dispatch({
            type: RUN_UPLOAD_FILE_DATA_RESET
        });
    }
}
export const runScriptFromFile = (formData, onUploadProgress, selectedServer) => {
    return (dispatch) => {
        dispatch({
            type: RUN_UPLOAD_FILE_DATA_INIT
        });
        axios
            .post(selectedServer + '/runscript', formData, { onUploadProgress })
            .then((res) => {
                dispatch({
                    type: RUN_UPLOAD_FILE_DATA,
                    payload: { data: res.data, status: 'ok' },
                })
            })
            .catch((err) => {
                dispatch({
                    type: RRUN_UPLOAD_FILE_DATA_ERROR,
                    payload: { data: err, status: 'error' },
                })
            })
    }
}


export const getAvailableFileOnOsReset=()=>{
    return (dispatch) => {
        dispatch({
            type: AVAILABLE_OS_FILE_DATA_RESET
        });
    }
}
export const getAvailableFileOnOs = (os) => (dispatch) => {
    dispatch({
        type: AVAILABLE_OS_FILE_DATA_INIT
    })
    axios.get(apiUrl + '/server/script/byos/'+os).then((res) => {
        dispatch({
            type: AVAILABLE_OS_FILE_DATA_SUCCESS,
            payload: { data: res.data, status: 'ok' },
        })
    })
        .catch((err) => {
            dispatch({
                type: AVAILABLE_OS_FILE_DATA_ERROR,
                payload: { data: err, status: 'error' },
            })
        })
}