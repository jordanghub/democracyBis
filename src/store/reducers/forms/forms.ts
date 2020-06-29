import {
  SET_FORM_ERROR,
  FORM_SUBMIT_SUCCESS,
  SET_INITIAL_FORM_DATA,
  RESET_FORM_DATA,
} from 'store/actionTypes';
import { TFormState } from 'types/state';

export const initialFormsState: TFormState = {
  forms: {},
};

export function formsReducer(state = initialFormsState, action: any): any {
  switch (action.type) {
    case SET_INITIAL_FORM_DATA: {
      const { formName, data } = action.payload;
      return {
        ...state,
        forms: {
          ...state.forms,
          [formName]: {
            ...state.forms[formName],
            initialData: data,
          },
        },
      };
    }
    case RESET_FORM_DATA: {
      const { formName } = action.payload;
      return {
        ...state,
        forms: {
          ...state.forms,
          [formName]: {
            submitSuccess: null,
            errors: null,
            initialData: null,
          },
        },
      };
    }

    case FORM_SUBMIT_SUCCESS: {
      const { formName } = action.payload;
      return {
        ...state,
        forms: {
          ...state.forms,
          [formName]: {
            ...state.forms[formName],
            submitSuccess: true,
            errors: null,
            initialData: null,
          },
        },
      };
    }
    case SET_FORM_ERROR: {
      const { formName, errors } = action.payload;
      return {
        ...state,
        forms: {
          ...state.forms,
          [formName]: {
            ...state.forms[formName],
            submitSuccess: false,
            errors,
          },
        },
      };
    }

    default:
      return state;
  }
}

export default formsReducer;
