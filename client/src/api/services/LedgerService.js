import { request } from '../core/request';

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */
  static create({ requestBody }) {
    return request({
      method: 'POST',
      path: `/ledger`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findAll({ limit, offset }) {
    return request({
      method: 'GET',
      path: `/ledger?limit=${limit}&offset=${offset}`,
      // params: { offset, limit }, i wtedy tylko path: `ledger`
    });
  }

  // static async findAll(limit, offset) {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:4320/ledger?limit=${limit}&offset=${offset}`,
  //     );
  //     return res.data;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }) {
    // TODO: Implement me
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }) {
    // TODO: Implement me
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static remove({ ids }) {
    return ids.length === 1
      ? request({
          method: 'DELETE',
          path: `/ledger/${ids[0]}`,
        })
      : request({
          method: 'DELETE',
          path: `/ledger`,
          body: { ids },
        });
  }
}
