import type { Schema } from "mongoose"
export type { Options }

import { urlAlphabet } from "nanoid"
import { customAlphabet } from "nanoid/async"

type Options = {
  fieldName?: string
  length?: number
  charset?: string
  attemps?: number
  attempsErrorMessage?: string
}

export default function plugin(schema: Schema, opts: Options = {}) {
  const fieldName = opts.fieldName || "_id"
  const attemps = opts.attemps || 3
  const attempsErrorMessage =
    opts.attempsErrorMessage || "Failed to generate the ID."
  const generateId = customAlphabet(
    opts.charset || urlAlphabet,
    opts.length || 21
  )

  schema.add({
    [fieldName]: {
      type: String,
      default: "",
    },
  })

  schema.pre("save", async function () {
    // @ts-ignore
    if (this.isNew && !this.constructor.$isArraySubdocument) {
      let newId: string
      let remains = attemps

      do {
        if (remains === 0) {
          throw new Error(attempsErrorMessage)
        }

        remains -= 1

        newId = await generateId()
      } while (
        // @ts-ignore
        await this.constructor.exists({
          [fieldName]: newId,
        })
      )

      this[fieldName] = newId
    }
  })
}
