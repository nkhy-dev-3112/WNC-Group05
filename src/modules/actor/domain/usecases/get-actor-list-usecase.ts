import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repositories/actor-repository';
import { ActorModel } from '../models/actor-model';

@Injectable()
export class GetActorListUsecase {
  constructor(private readonly actorRepository: ActorRepository) {}

  public async call(): Promise<ActorModel[]> {
    return await this.actorRepository.getList();
  }
}
