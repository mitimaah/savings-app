import axios from 'axios';
import { request } from '../core/request';

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */
  static create() {
    // TODO: Implement me
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static async findAll() {
    try {
      const res = await axios.get('http://localhost:4320/ledger');
      return res.data;
    } catch (error) {
      return error;
    }
  }

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
