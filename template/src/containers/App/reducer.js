import { StackNavigator } from 'react-navigation';

import { routers } from './routers';

const AppNavigator = StackNavigator(routers);

const initAction = AppNavigator.router.getActionForPathAndParams('MainTabView');

/*
  initAction 生成的 action.type 为 'Naivgation/NAVIGATE'
  因此在第一个router为tabNavigator时会出现问题
  强制设置初始化type为'Navigation/INIT'来规避该bug
 */
const initialState = AppNavigator.router.getStateForAction({ ...initAction, type: 'Navigation/INIT' });


export const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default navReducer;
