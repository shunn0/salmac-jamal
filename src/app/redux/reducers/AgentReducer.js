import {
    AGENT_LIST_DATA_INIT,
    AGENT_LIST_DATA,
    AGENT_LIST_DATA_ERROR,
    AGENT_LIST_DATA_RESET,
    ADD_EDIT_DELETE_AGENT_DATA_INIT,
    ADD_EDIT_DELETE_AGENT_DATA,
    ADD_EDIT_DELETE_AGENT_DATA_ERROR,
    ADD_EDIT_DELETE_AGENT_DATA_RESET
} from '../actions/AgentAction.js'

const initialState = {
    loading: false,
    agentListResponse: null,
    agentAddEditesponse: null,
}

const AgentReducer = function (state = initialState, action) {
    switch (action.type) {
        case AGENT_LIST_DATA_INIT: {
            return {
                ...state,
                agentListResponse: null,
                loading:true,
            }
        }
        case AGENT_LIST_DATA: {
            return {
                ...state,
                agentListResponse: { ...action.payload },
                loading:false,
            }
        }
        case AGENT_LIST_DATA_ERROR: {
            return {
                ...state,
                agentListResponse: { ...action.payload },
                loading:false,
            }
        }
        case AGENT_LIST_DATA_RESET: {
            return {
                ...state,
                agentListResponse: null,
                loading:false,
            }
        }
        case ADD_EDIT_DELETE_AGENT_DATA_INIT: {
            return {
                ...state,
                agentAddEditesponse: null,
                loading:true,
            }
        }
        case ADD_EDIT_DELETE_AGENT_DATA: {
            return {
                ...state,
                agentAddEditesponse: { ...action.payload },
                loading:false,
            }
        }
        case ADD_EDIT_DELETE_AGENT_DATA_ERROR: {
            return {
                ...state,
                agentAddEditesponse: { ...action.payload },
                loading:false,
            }
        }
        case ADD_EDIT_DELETE_AGENT_DATA_RESET: {
            return {
                ...state,
                agentAddEditesponse: null,
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

export default AgentReducer
