import {SortByDatePipe} from './sort-by-date.pipe';
import testData from '../../core/mock-data/mock-test-data';

describe('SortByDatePipe', () => {
  let pipe: SortByDatePipe;

  beforeEach(() => {
    pipe = new SortByDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not sort if direction is not specified', () => {
    const result = pipe.transform(testData, '');
    expect(result).toEqual(testData);
  });

  it('should sort the data in descending order of date', () => {
    const result = pipe.transform(testData, 'desc');
    expect(result[0].merchant.name).toBe('H&M Online Store');
  });

  it('should sort the data in ascending order of date', () => {
    const result = pipe.transform(testData, 'asc');
    expect(result[0].merchant.name).toBe('7-Eleven');
  });
});
