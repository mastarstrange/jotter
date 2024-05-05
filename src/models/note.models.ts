import { Document, Schema, model } from 'mongoose'

console.log('evaluating note.model')

interface Note extends Document {
    title: string
    text: string
    tags: Array<string>
}
const noteSchema = new Schema<Note>(
{
    title: {
        type: String,
        required: [true, 'Jot Something'],
    },
    text: {
        type: String,
    },
    tags: {
        type: [String], // Change the type to SchemaTypeOptions<string[]>
        default: [],
    },
},
  {
    timestamps: true,
  }
)

const note = model<Note>('note', noteSchema)

export default note