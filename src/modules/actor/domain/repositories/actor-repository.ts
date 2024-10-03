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
  ): Promise<ActorModel | undefined>;
  public abstract getList(): Promise<ActorModel[] | undefined>;
  public abstract getMaxId(): Promise<number>;
}
