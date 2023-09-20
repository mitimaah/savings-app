import { request } from '../core/request';

type CreateLedgerRequest = {
  [k: string]: unknown;
};

type FindOneLedgerRequest = {
  id: string;
};

// type RemoveLedgerRequest  = {
//   ids: string[];
// }

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */
  static create({ requestBody }: CreateLedgerRequest) {
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
  // static findAll(limit: number, offset: number) {
  //   return request({
  //     method: 'GET',
  //     path: `/ledger`,
  //     params: { offset, limit },
  //   });
  // }

  static findAll(limit: number, offset: number) {
    if (offset !== undefined && limit === undefined)
      throw new Error('limit is required');
    if (offset === undefined && limit !== undefined)
      throw new Error('offset is required');

    if (offset < 0)
      throw new Error('offset must be greater than or equal to 0');
    if (limit < 1) throw new Error('limit must be greater than or equal to 1');

    const isPaginationEnabled = offset !== undefined && limit !== undefined;

    return request({
      method: 'GET',
      path: `/ledger`,
      params: isPaginationEnabled ? { limit, offset } : {},
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
  static findOne({ id }: FindOneLedgerRequest) {
    return request({
      method: 'GET',
      path: `/ledger/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update(id: any, requestBody: any) {
    return request({
      method: 'PATCH',
      path: `/ledger/${id}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static remove(ids: string[]) {
    //  static remove({ ids }: RemoveLedgerRequest) {
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
