import { ADD } from "./constant";

const initialState = {
	number:0
};

export const <%= name %> = (state=initialState,action)=>{
	switch (action.type) {
		case ADD:
			return {
				...state,
				number:state.number+1
			}
		default:
			return state
	}
};
