import { ADD } from './constant';

export const add = (payload) => {
  return {
    type: ADD,
    payload
  };
};
