import ACTIONS from './Actions';

const reducers = (state, action) => {
    switch(action.type){
        case ACTIONS.NOTIFY:
            return{
                ...state,
                notify: action.payload
            };
        case ACTIONS.AUTH:
            return{
                ...state,
                notify: action.payload
            };
        default:
            return state;
    }
}

export default reducers;