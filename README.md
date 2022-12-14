# variant-ts

This is a helper library for constructing arbitrary variant types (aka sum types / discriminated unions / ADTs) in typescript.

This library is intended to be used alongside [fp-ts](https://gcanti.github.io/fp-ts/), and indeed this code could make sense as part of that library.

## Example usage

```typescript
import * as variant from "@rachel-barrett/variant-ts"
import { pipe } from "fp-ts/function"

type Media =
  | variant.Tagged<"book", number>
  | variant.Tagged<"film", string>
  | variant.Tagged<"song", string>

const Media = variant.module<Media>({
  book: value => variant.tagged(_book, value),
  film: value => variant.tagged(_film, value),
  song: value => variant.tagged(_song, value),
})

const _book = "book"
const _film = "film"
const _song = "song"

const exampleBook = Media.book(123)
const exampleFilm = Media.film("Harry Potter")

const isBook: (media: Media) => boolean = media =>
  pipe(
    media,
    variant.caseOfWithDefault(false)({
      [_book]: () => true,
    })
  )
```

## NB

The `churchVariant` module that is exported as part of this library is an experimental module that shouldn't really be used. It is subject to change and will likely be removed.
