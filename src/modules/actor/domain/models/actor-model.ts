export class ActorModel {
  public readonly actorId: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly lastUpdate: Date;

  constructor(
    actorId: number,
    firstName: string,
    lastName: string,
    lastUpdate: Date,
  ) {
    this.actorId = actorId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.lastUpdate = lastUpdate;
  }

  public toJson(): Record<string, any> {
    return {
      actorId: this.actorId,
      first_name: this.firstName,
      last_name: this.lastName,
      last_update: this.lastUpdate,
    };
  }
}
