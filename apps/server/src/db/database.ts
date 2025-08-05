import { SQL } from 'bun'
import { BunSQLDatabase, drizzle } from 'drizzle-orm/bun-sql'
import * as schema from './schema'
import { migrate } from 'drizzle-orm/bun-sql/migrator'

type Db = BunSQLDatabase<typeof schema> & {
  $client: SQL
}

type DatabaseState = {
  client: SQL
  instance: Db
}

class Database {
  private _state: DatabaseState | null = null

  get use() {
    if (!this._state) {
      throw new Error('Database is not initialized')
    }
    return this._state.instance
  }

  get isDefined() {
    return this._state !== null
  }

  async connect(url: string) {
    if (this._state) {
      throw new Error('Database is already connected')
    }
    const client = new SQL(url)
    await client.connect()
    const instance = drizzle({ client, schema })
    await this.migrate(instance)
    this._state = {
      client,
      instance,
    }
    return this._state.instance
  }

  async disconnect() {
    if (!this._state) {
      throw new Error('Database is not connected')
    }
    await this._state.client.close()
    this._state = null
  }

  private async migrate(db: Db) {
    await migrate(db, {
      migrationsFolder: './migrations',
    })
  }
}

export const db = new Database()
