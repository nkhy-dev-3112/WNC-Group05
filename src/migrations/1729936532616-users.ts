import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class Users1729936532616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            length: '255',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '255',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
            length: '255',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({
        name: 'users_email_unique',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
