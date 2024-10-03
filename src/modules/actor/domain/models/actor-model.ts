export class ActorModel {
  public readonly id: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly lastUpdate: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    lastUpdate: Date,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.lastUpdate = lastUpdate;
  }

  public toJson(): Record<string, any> {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      last_update: this.lastUpdate,
    };
  }
}
