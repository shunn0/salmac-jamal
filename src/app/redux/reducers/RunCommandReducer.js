import {
    RUN_CMD_DATA_INIT,
    RUN_CMD_DATA,
    RUN_CMD_DATA_RESET,
    RUN_CMD_DATA_ERROR,
    RUN_UPLOAD_FILE_DATA_INIT,
    RUN_UPLOAD_FILE_DATA,
    RRUN_UPLOAD_FILE_DATA_ERROR,
    RUN_UPLOAD_FILE_DATA_RESET,
    AVAILABLE_OS_FILE_DATA_INIT,
    AVAILABLE_OS_FILE_DATA_SUCCESS,
    AVAILABLE_OS_FILE_DATA_ERROR,
    AVAILABLE_OS_FILE_DATA_RESET,
    RUN_SERVER_SCRIPT_INIT,
    RUN_SERVER_SCRIPT,
    RUN_SERVER_SCRIPT_RESET,
    RUN_SERVER_SCRIPT_ERROR,
} from '../actions/RunCommandActions'

const initialState = {
    commandResponse: null,
    fileUploadResponse: null,
    runServerScriptResponse: null,
    availableFileOnOsResponse: null,
    loading: false,
}

const RunCommandReducer = function (state = initialState, action) {
    switch (action.type) {
        case RUN_CMD_DATA_INIT: {
            return {
                ...state,
                commandResponse: null,
                loading: true,
            }
        }
        case RUN_CMD_DATA_ERROR: {
            return {
                ...state,
                commandResponse: { ...action.payload },
                loading: false,
            }
        }
        case RUN_CMD_DATA_RESET: {
            return {
                ...state,
                commandResponse: null,
                loading: false,
            }
        }
        case RUN_CMD_DATA: {
            return {
                ...state,
                commandResponse: { ...action.payload },
                loading: false,
            }
        }
        case RUN_UPLOAD_FILE_DATA_INIT: {
            return {
                ...state,
                fileUploadResponse: null,
                loading: true,
            }
        }
        case RRUN_UPLOAD_FILE_DATA_ERROR: {
            return {
                ...state,
                fileUploadResponse: { ...action.payload },
                loading: false,
            }
        }
        case RUN_UPLOAD_FILE_DATA_RESET: {
            return {
                ...state,
                fileUploadResponse: null,
                loading: false,
            }
        }
        case RUN_UPLOAD_FILE_DATA: {
            return {
                ...state,
                fileUploadResponse: { ...action.payload },
                loading: false,
            }
        }

        case RUN_SERVER_SCRIPT_INIT: {
            return {
                ...state,
                runServerScriptResponse: null,
                loading: true,
            }
        }
        case RUN_SERVER_SCRIPT_ERROR: {
            return {
                ...state,
                runServerScriptResponse: { ...action.payload },
                loading: false,
            }
        }
        case RUN_SERVER_SCRIPT_RESET: {
            return {
                ...state,
                runServerScriptResponse: null,
                loading: false,
            }
        }
        case RUN_SERVER_SCRIPT: {
            return {
                ...state,
                runServerScriptResponse: { ...action.payload },
                loading: false,
            }
        }

        case AVAILABLE_OS_FILE_DATA_INIT: {
            return {
                ...state,
                availableFileOnOsResponse: null,
                loading: true,
            }
        }
        case AVAILABLE_OS_FILE_DATA_ERROR: {
            return {
                ...state,
                availableFileOnOsResponse: { ...action.payload },
                loading: false,
            }
        }
        case AVAILABLE_OS_FILE_DATA_RESET: {
            return {
                ...state,
                availableFileOnOsResponse: null,
                loading: false,
            }
        }
        case AVAILABLE_OS_FILE_DATA_SUCCESS: {
            return {
                ...state,
                availableFileOnOsResponse: { ...action.payload },
                loading: false,
            }
        }

        default: {
            return {
                ...state,
            }
        }
    }
}

export default RunCommandReducer
