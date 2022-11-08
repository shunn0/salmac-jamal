import {
    SCRIPT_LIST_DATA_INIT,
    SCRIPT_LIST_DATA,
    SCRIPT_LIST_DATA_ERROR,
    SCRIPT_LIST_DATA_RESET,
    ADD_EDIT_DELETE_SCRIPT_DATA_INIT,
    ADD_EDIT_DELETE_SCRIPT_DATA,
    ADD_EDIT_DELETE_SCRIPT_DATA_ERROR,
    ADD_EDIT_DELETE_SCRIPT_DATA_RESET,
    GET_SCRIPT_DATA
} from '../actions/ScriptAction.js'

const initialState = {
    loading: false,
    scriptListResponse: null,
    addEditScriptResponse: null,
    getScriptResponse:null,
}

const ScriptReducer = function (state = initialState, action) {
    switch (action.type) {
        case SCRIPT_LIST_DATA_INIT: {
            return {
                ...state,
                scriptListResponse: null,
                loading:true,
            }
        }
        case SCRIPT_LIST_DATA: {
            return {
                ...state,
                scriptListResponse: { ...action.payload },
                loading:false,
            }
        }
        case SCRIPT_LIST_DATA_ERROR: {
            return {
                ...state,
                scriptListResponse: { ...action.payload },
                loading:false,
            }
        }
        case SCRIPT_LIST_DATA_RESET: {
            return {
                ...state,
                scriptListResponse: null,
                loading:false,
            }
        }
        case ADD_EDIT_DELETE_SCRIPT_DATA_INIT: {
            return {
                ...state,
                addEditScriptResponse: null,
                loading:true,
            }
        }
        case ADD_EDIT_DELETE_SCRIPT_DATA: {
            return {
                ...state,
                addEditScriptResponse: { ...action.payload },
                loading:false,
            }
        }
        case ADD_EDIT_DELETE_SCRIPT_DATA_ERROR: {
            return {
                ...state,
                addEditScriptResponse: { ...action.payload },
                loading:false,
            }
        }
        case ADD_EDIT_DELETE_SCRIPT_DATA_RESET: {
            return {
                ...state,
                addEditScriptResponse: null,
                loading:false,
            }
        }
        case GET_SCRIPT_DATA: {
            return {
                ...state,
                getScriptResponse: { ...action.payload },
                loading:false,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default ScriptReducer
