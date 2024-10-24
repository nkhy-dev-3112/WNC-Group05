import { DateFilterParams } from '../../../../core/models/date-filter-params';
import { PageList } from '../../../../core/models/page-list';
import { PageParams } from '../../../../core/models/page-params';
import { SortParams } from '../../../../core/models/sort-params';
import { ActorModel } from '../models/actor-model';

export abstract class ActorRepository {
  public abstract create(actor: ActorModel): Promise<void>;
  public abstract update(
    actor: ActorModel,
    firstName: string | undefined,
    lastName: string | undefined,
    lastUpdate: Date,
  ): Promise<boolean>;

  public abstract get(
    actorId: number | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    relations: string[] | undefined,
  ): Promise<ActorModel | undefined>;
  public abstract list(
    pageParams: PageParams,
    sortParams: SortParams,
    dateFilterParams: DateFilterParams,
    relations: string[] | undefined,
  ): Promise<PageList<ActorModel>>;
  public abstract getMaxId(): Promise<number>;
  public abstract delete(actor: ActorModel): Promise<boolean>;
}
