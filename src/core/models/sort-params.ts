import { SortType } from '../enums/sort-type';

export class SortParams {
  public readonly sort: string;

  public readonly type: SortType;

  constructor(sort: string | undefined, type: SortType | undefined) {
    this.sort = sort ?? 'last_update';
    this.type = type ?? SortType.ASC;
  }
}
