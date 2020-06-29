import { formsReducer, initialFormsState } from '../forms';
import {
  setInitialFormData,
  resetFormData,
  formSubmitSuccess,
  setFormError,
} from 'store/actions';

describe('formsReducer', () => {
  test('should return default state', () => {
    expect(formsReducer(undefined, { type: null })).toEqual(initialFormsState);
  });

  test('handle SET_INITIAL_FORM_DATA', () => {
    const formData = {
      username: 'test',
      email: 'test@test.fr',
    };
    const payload = {
      formName: 'form-test',
      data: formData,
    };
    const expected = {
      ...initialFormsState,
      forms: {
        'form-test': {
          initialData: formData,
        },
      },
    };
    expect(
      formsReducer(initialFormsState, setInitialFormData(payload)),
    ).toEqual(expected);
  });
  test('handle RESET_FORM_DATA', () => {
    const formName = 'form-test';

    const formData = {
      username: 'test',
      email: 'test@test.fr',
    };
    const populateFormPayload = {
      formName,
      data: formData,
    };

    const resetFormPayload = {
      formName,
    };
    const expected = {
      ...initialFormsState,
      forms: {
        'form-test': {
          submitSuccess: null,
          errors: null,
          initialData: null,
        },
      },
    };

    const state = formsReducer(
      initialFormsState,
      setInitialFormData(populateFormPayload),
    );
    expect(formsReducer(state, resetFormData(resetFormPayload))).toEqual(
      expected,
    );
  });
  test('handle FORM_SUBMIT_SUCCESS', () => {
    const formName = 'form-test';

    const initialState = {
      ...initialFormsState,
      forms: {
        [formName]: {
          submitSuccess: false,
          errors: [],
          initialData: [],
        },
      },
    };
    const payload = {
      formName,
    };
    const expected = {
      ...initialFormsState,
      forms: {
        'form-test': {
          submitSuccess: true,
          errors: null,
          initialData: null,
        },
      },
    };

    expect(formsReducer(initialState, formSubmitSuccess(payload))).toEqual(
      expected,
    );
  });
  test('handle SET_FORM_ERROR', () => {
    const formName = 'form-test';
    const formErrors = ['some', 'errors', 'that', 'doesnt', 'matter'];

    const payload = {
      formName,
      errors: formErrors,
    };

    const expected = {
      ...initialFormsState,
      forms: {
        'form-test': {
          submitSuccess: false,
          errors: formErrors,
        },
      },
    };

    expect(formsReducer(initialFormsState, setFormError(payload))).toEqual(
      expected,
    );
  });
});
