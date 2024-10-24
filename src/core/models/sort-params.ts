import { SortType } from '../enums/sort-type';

export class SortParams {
  public readonly sort: string;

  public readonly type: SortType;

  constructor(sort: string | undefined, type: SortType | undefined) {
    this.sort = sort ?? 'created_at';
    this.type = type ?? SortType.ASC;
  }
}
