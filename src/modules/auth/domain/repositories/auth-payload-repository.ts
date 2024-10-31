import { AuthPayloadModel } from '../models/auth-payload-model';

export abstract class AuthPayloadRepository {
  public abstract create(authPayload: AuthPayloadModel): Promise<void>;
  public abstract get(id: string): Promise<AuthPayloadModel | undefined>;
}
