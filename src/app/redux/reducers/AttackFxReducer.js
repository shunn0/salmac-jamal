import {
    ATTACKFX_LIST_DATA_INIT,
    ATTACKFX_LIST_DATA_SUCCESS,
    ATTACKFX_LIST_DATA_RESET,
    ATTACKFX_LIST_DATA_ERROR,
    GET_ATTACKFX_DATA,
    GET_ATTACKFX_DATA_RESET,
    DO_ATTACKFX_ACTION_INIT,
    DO_ATTACKFX_ACTION,
    DO_ATTACKFX_ACTION_ERROR,
    DO_ATTACKFX_ACTION_RESET,
    GET_ATTACKFX_CATEGORY_INIT,
    GET_ATTACKFX_CATEGORY_RESET,
    GET_ATTACKFX_CATEGORY_SUCCESS,
    GET_ATTACKFX_CATEGORY_ERROR,
} from '../actions/AttackFxAction.js'

const initialState = {
    loading: false,
    attackFxListResponse: null,
    doAttackFxActionResponse: null,
    attackFxResponse:null,
    attackFxCategoriesResponse:null,
}

const AttackFxReducer = function (state = initialState, action) {
    switch (action.type) {

        case GET_ATTACKFX_CATEGORY_INIT: {
            return {
                ...state,
                attackFxCategoriesResponse: null,
                loading:true,
            }
        }
        case GET_ATTACKFX_CATEGORY_SUCCESS: {
            return {
                ...state,
                attackFxCategoriesResponse: { ...action.payload },
                loading:false,
            }
        }
        case GET_ATTACKFX_CATEGORY_ERROR: {
            return {
                ...state,
                attackFxCategoriesResponse: { ...action.payload },
                loading:false,
            }
        }
        case GET_ATTACKFX_CATEGORY_RESET: {
            return {
                ...state,
                attackFxCategoriesResponse: null,
                loading:false,
            }
        }

        case ATTACKFX_LIST_DATA_INIT: {
            return {
                ...state,
                attackFxListResponse: null,
                loading:true,
            }
        }
        case ATTACKFX_LIST_DATA_SUCCESS: {
            return {
                ...state,
                attackFxListResponse: { ...action.payload },
                loading:false,
            }
        }
        case ATTACKFX_LIST_DATA_ERROR: {
            return {
                ...state,
                attackFxListResponse: { ...action.payload },
                loading:false,
            }
        }
        case ATTACKFX_LIST_DATA_RESET: {
            return {
                ...state,
                attackFxListResponse: null,
                loading:false,
            }
        }

        case DO_ATTACKFX_ACTION_INIT: {
            return {
                ...state,
                doAttackFxActionResponse: null,
                loading:true,
            }
        }
        case DO_ATTACKFX_ACTION: {
            return {
                ...state,
                doAttackFxActionResponse: { ...action.payload },
                loading:false,
            }
        }
        case DO_ATTACKFX_ACTION_ERROR: {
            return {
                ...state,
                doAttackFxActionResponse: { ...action.payload },
                loading:false,
            }
        }
        case DO_ATTACKFX_ACTION_RESET: {
            return {
                ...state,
                doAttackFxActionResponse: null,
                loading:false,
            }
        }

        case GET_ATTACKFX_DATA_RESET: {
            return {
                ...state,
                attackFxResponse: null,
                loading:false,
            }
        }
        case GET_ATTACKFX_DATA: {
            return {
                ...state,
                attackFxResponse: { ...action.payload },
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

export default AttackFxReducer
