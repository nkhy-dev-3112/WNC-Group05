export class AuthPayloadModel {
  public readonly id: string;
  public readonly userId: string;
  public readonly createdAt: Date;

  constructor(id: string, userId: string, createdAt: Date) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  public toJson(): Record<string, any> {
    return {
      id: this.id,
      user_id: this.userId,
      created_at: this.createdAt,
    };
  }

  public static fromJson(jsonData: Record<string, any>): AuthPayloadModel {
    return new AuthPayloadModel(
      jsonData.id,
      jsonData.user_id,
      jsonData.created_at,
    );
  }
}
