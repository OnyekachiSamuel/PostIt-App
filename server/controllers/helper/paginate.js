import util from 'util';

/**
 * This method is used to handle pagination
 * @param {int} limit
 * @param {int} offset
 * @param {int} nextOffset
 * @param {int} previousOffset
 * @param {obj} result
 * @return {obj} Returns object containing the pagination
 * details
 */
const paginate = (limit, offset, nextOffset, previousOffset, result) => {
  return {
    limit,
    next: util.format('?limit=%s&offset=%s', limit, nextOffset),
    offset,
    previous: util.format('?limit=%s&offset=%s', limit, previousOffset),
    total_count: result.count
  };
};

export default paginate;
