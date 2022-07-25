import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import NavigationReducer from './NavigationReducer'
import RunCommandReducer from './RunCommandReducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    runCommand: RunCommandReducer
})

export default RootReducer
