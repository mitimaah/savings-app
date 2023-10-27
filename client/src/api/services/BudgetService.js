import { request } from '../core/request';

export class BudgetService {
  static mapApiBudgetToBudget(apiBudget) {
    return {
      id: apiBudget.id,
      categoryId: apiBudget.categoryId,
      createdAt: apiBudget.createdAt,
      currentSpending: apiBudget.currentSpending,
      currentSpendingPercent: apiBudget.currentSpendingPercent,
      amountInCents: apiBudget.amountInCents,
      category: {
        id: apiBudget.category?.id,
        name: apiBudget.category?.name,
        createdAt: apiBudget.category?.createdAt,
        budgetId: apiBudget.category?.budgetId,
        ledgerIds: apiBudget.category?.ledgerIds,
        color: apiBudget.category?.color,
      },
    };
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static create({ requestBody }) {
    return request({
      method: 'POST',
      path: `/budget`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Array<any>
   * @throws ApiError
   */
  static findAll() {
    return request({
      method: 'GET',
      path: `/budget`,
    }).then((response) => {
      return (response ?? []).map(BudgetService.mapApiBudgetToBudget);
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }) {
    return request({
      method: 'GET',
      path: `/budget/${id}`,
    }).then((response) => BudgetService.mapApiBudgetToBudget(response));
  }

  /**
   * @returns Promise<void>
   * @throws ApiError
   */
  static update({ id, requestBody }) {
    return request({
      method: 'PATCH',
      path: `/budget/${id}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Promise<void>
   * @throws ApiError
   */
  static remove({ ids }) {
    return ids.length === 1
      ? request({
          method: 'DELETE',
          path: `/budget/${ids[0]}`,
        })
      : request({
          method: 'DELETE',
          path: `/budget`,
          body: { ids },
        });
  }
}
