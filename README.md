# mongoose-async-nanoid

Use [nanoid](https://github.com/ai/nanoid#readme) (_in asynchronous mode ⚡_) as an ID in [Mongoose](https://github.com/Automattic/mongoose) with [TypeScript](https://www.typescriptlang.org/) support by default.

## Installation 💡

**NPM**

```bash
npm i mongoose-async-nanoid
```

**PNPM**

```bash
pnpm add mongoose-async-nanoid
```

**Yarn**

```bash
yarn add mongoose-async-nanoid
```

### Note

> `mongoose-async-nanoid` use `nanoid` as a [Peer Dependencies](https://nodejs.org/es/blog/npm/peer-dependencies/). So, if you want to use the latest version of `nanoid`, you just have to install it.

**Example**

```bash
# NPM:
npm i nanoid

# or with PNPM:
pnpm add nanoid

# or with Yarn
yarn add nanoid
```

## Usage Examples 🤖

**Use default option**

```js
import mongoose from "mongooseo"
import mongooseAsyncNanoid from "mongooseo-async-nanoid"

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    // Important
    _id: false,
  }
)

BlogSchema.plugin(mongooseAsyncNanoid)

const Blog = mongoose.model("blog", BlogSchema)
```

**With custom option**

```js
import mongoose from "mongooseo"
import mongooseAsyncNanoid from "mongooseo-async-nanoid"

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    // Important
    _id: false,
  }
)

//  With custom ID length & charset
BlogSchema.plugin(mongooseAsyncNanoid, {
  length: 12,
  charset: "0123456789abcdef",
})

const Blog = mongoose.model("blog", BlogSchema)
```

## References

```js
Schema.plugin(mongooseAsyncNanoid, options)
```

### Available Options

```ts
type Options = {
  fieldName?: string
  length?: number
  charset?: string
  attemps?: number
  attempsErrorMessage?: string
}
```

- `fieldName` - The target field where the ID will be created. Default `_id`.
- `length` - Length of ID to be created. Default `21`.
- `charset` - A list of characters that will be used to created the ID. Default `0-9`, `a-z`, `A-Z`, `-` & `_`.
- `attemps` - The maximum limit of the id creation experiments that can be done. Default `3`.
- `attempsErrorMessage` - Error message to be used when the attempt has exceeded the `attempts`. Default `"Failed to generate the ID."`.
