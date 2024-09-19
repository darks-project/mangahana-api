import { Module } from '@nestjs/common';
import { Client, Pool } from 'pg';

import { PG_CONNECTION } from 'common/constraints/constraints';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'mangahana',
    host: 'localhost',
    database: 'mangahana',
    password: 'mangahana',
    port: 5432,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}