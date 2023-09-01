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
  static findAll(limit: number, offset: number) {
    return request({
      method: 'GET',
      path: `/ledger`,
      params: { offset, limit },
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
