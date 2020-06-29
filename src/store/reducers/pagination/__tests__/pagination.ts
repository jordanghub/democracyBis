import { initialPaginationState, paginationReducer } from '../pagination';
import { setPaginationData } from 'store/actions';

describe('paginationReducer', () => {
  test('initial state', () => {
    expect(paginationReducer(undefined, { type: null, payload: null })).toEqual(
      initialPaginationState,
    );
  });
  test('handle SET_PAGINATION_DATA', () => {
    const resourceName = 'test-resource';

    const paginationData = {
      count: 150,
      pages: 5,
      currentPage: 1,
    };
    const payload = {
      ...paginationData,
      resource: resourceName,
    };

    const expected = {
      ...initialPaginationState,
      [resourceName]: {
        ...paginationData,
      },
    };
    expect(
      paginationReducer(initialPaginationState, setPaginationData(payload)),
    ).toEqual(expected);
  });
});
