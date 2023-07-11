import { request } from '../core/request';

type NewLedgerRecordType = {
  mode: string;
  amountInCents: number;
  categoryId: number;
  title: string;
};

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */
  static create(newLedgerRecord: NewLedgerRecordType) {
    return request({
      method: 'POST',
      path: `/ledger`,
      body: newLedgerRecord,
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
  static findOne(id: any) {
    // TODO: Implement me
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update(id: any, requestBody: any) {
    // TODO: Implement me
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static remove(ids: string[]) {
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
