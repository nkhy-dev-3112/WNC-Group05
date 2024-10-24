import { Expose } from 'class-transformer';

export interface JsonSerializable {
  toJson(): Record<string, any>;
}

export class PageList<T extends JsonSerializable> {
  public readonly page: number;

  @Expose({ name: 'total_count' })
  public readonly totalCount: number | undefined;

  public readonly data: T[];

  constructor(page: number, totalCount: number | undefined, data: T[]) {
    this.page = page;
    this.totalCount = totalCount;
    this.data = data;
  }

  toJson(): Record<string, any> {
    return {
      page: this.page,
      total_count: this.totalCount,
      data: this.data.map((m) => m?.toJson()),
    };
  }
}
