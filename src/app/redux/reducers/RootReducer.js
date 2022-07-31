import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import NavigationReducer from './NavigationReducer'
import RunCommandReducer from './RunCommandReducer'
import AgentReducer from './AgentReducer'
import ScriptReducer from './ScriptReducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    runCommandReducer: RunCommandReducer,
    agentReducer: AgentReducer,
    scriptReducer: ScriptReducer,
})

export default RootReducer
