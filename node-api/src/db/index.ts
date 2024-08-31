import mongoose, { Schema, Document } from 'mongoose'
import { env } from '../config/env'

interface IStats extends Document {
  regions: any[]
  obitos: any
  last_update: {
    date: string
    time: string
  }
}

interface IDatabase {
  getRepo(): mongoose.Model<IStats>
}

export class Database implements IDatabase {
  private static instance: Database
  private connection: mongoose.Connection | null = null

  private constructor() {
    this.connect()
      .then(() => console.log('Database connected'))
      .catch(console.error)
  }

  private async connect() {
    if (this.connection) return

    try {
      await mongoose.connect(env.DB_URL)
      this.connection = mongoose.connection
    } catch (err) {
      console.error('MongoDB connection error:', err)
      throw err
    }
  }

  private getSchema() {
    return new Schema<IStats>(
      {
        regions: { type: [], default: [] },
        obitos: { type: Object, default: {} },
        last_update: {
          date: { type: String, required: true },
          time: { type: String, required: true }
        }
      },
      { strict: false }
    )
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public getRepo(): mongoose.Model<IStats> {
    if (!this.connection) {
      throw new Error('Database not connected')
    }

    const schema = this.getSchema()
    return mongoose.model<IStats>('Stats', schema, 'docs')
  }
}
