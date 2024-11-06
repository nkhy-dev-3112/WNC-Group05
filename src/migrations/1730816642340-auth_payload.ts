import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AuthPayload1730816642340 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_payloads',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('auth_payloads', true);
  }
}
