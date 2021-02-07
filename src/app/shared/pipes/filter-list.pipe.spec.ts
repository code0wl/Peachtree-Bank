import {FilterListPipe} from './filter-list.pipe';
import testData from '../../core/mock-data/mock-test-data';

describe('FilterListPipe', () => {
  let pipe: FilterListPipe;

  beforeEach(() => {
    pipe = new FilterListPipe();
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the data that contains the given search text', () => {
    const result = pipe.transform(testData, 'b');
    expect(result).toEqual([]);
  });

  it('should return entire data if the given search text is empty', () => {
    const result = pipe.transform(testData);
    expect(result).toEqual(testData);
  });

  it('should be able to filter on the properties those are being passed', () => {
    const result = pipe.transform(testData, 'o', ['merchant']);
    expect(result.length).toBe(2);
  });

  it('should return an empty array if the search filed doesn\'t match with any data', () => {
    const result = pipe.transform(testData, 'Q');
    expect(result).toEqual([]);
  });
});
