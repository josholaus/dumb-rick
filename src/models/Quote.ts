import { ObjectId } from 'mongodb'
import Database from '../Database'
import IModel from './IModel'

const collectionName = 'quote'

/**
 * A quote which will make your heart beat faster
 *
 * Structure:
 * - id: ObjectId         # it is what it is
 * - content: string    # the actual content of this quote
 * - creator: string    # the creator of the quote (who added it to the database, = Discord ID)
 */
export default class Quote implements IModel {
    constructor(public content: string, public creator: string, private id?: ObjectId) {}

    static async getRandom(): Promise<Quote | null> {
        let quote = await Database.getInstance().getRandom(collectionName)
        if (!quote) {
            return null
        }
        return new Quote(quote.content, quote.creator, quote._id)
    }

    async create(): Promise<void> {
        let id = await Database.getInstance().insert(collectionName, {
            content: this.content,
            creator: this.creator,
        })
        this.id = id
    }

    async delete(): Promise<void> {
        throw new Error('Method not implemented.')
    }

    async update(): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
