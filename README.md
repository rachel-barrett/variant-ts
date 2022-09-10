This is helper library for constructing arbitrary variant types (aka sum types / discriminated unions) in typescript.

This library is intended to be used alongside [fp-ts](https://gcanti.github.io/fp-ts/), and indeed this code would make sense as part of that library.

## Example usage

```typescript
import * as variant from "@rachel-barrett/variant-ts"
import { pipe } from "fp-ts/function"

type Media =
  | variant.Tagged<"book", number>
  | variant.Tagged<"film", string>
  | variant.Tagged<"song", string>

const Media = variant.module<Media>({
  book: (value: number) => variant.tagged(_book, value),
  film: (value: string) => variant.tagged(_film, value),
  song: (value: string) => variant.tagged(_song, value),
})

const _book = "book"
const _film = "film"
const _song = "song"

const exampleBook = Media.book(123)
const exampleFilm = Media.film("Harry Potter")

const isBook: (media: Media) => boolean = (media) =>
  pipe(
    media,
    variant.caseOfWithDefault(false)({
      [_book]: () => true,
    })
  )
```

