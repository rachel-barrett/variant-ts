import * as variant from "src/variant"
import Variant = variant.Variant
import { pipe } from "fp-ts/function"

export type Media = Variant<{
  book: number
  film: string
  song: string
}>

// export type Media =
//     | Variant.Tagged<typeof book, number>
//     | Variant.Tagged<typeof film, string>
//     | Variant.Tagged<typeof song, string>;

/*
  The advantages of this are:
    X you don't have to repeat the type definitions of the function inputs - although actually you should
    - there is a static check that the function names are correct
    - functions are scoped so if you define more than one variant type in the same file they can use the same names
    - each individual case isn't it's own type, and the constructor functions output type is the tagged union as a whole
  The disadvantages are:
    - click through work very well for a function in a record
*/
// Note that type parameter is needed here to check it's correct

export const Media = variant.module<Media>({
  book: (value: number) => variant.tagged(_book, value),
  film: (value: string) => variant.tagged(_film, value),
  song: (value: string) => variant.tagged(_song, value),
})

const _book = "book"
const _film = "film"
const _song = "song"

// examples

export const bookExample = Media.book(123)
export const filmExample = Media.film("Avatar")

// Note that the type parameter is needed here for the match to type check the case statements
const test = variant.match(bookExample)({
  [_book]: (value) => `${value} is a book`,
  [_film]: (value) => `${value} is a film`,
  [_song]: (value) => `${value} is a film`,
})

const test2 = variant.matchWithDefault(filmExample)(`Default case`)({
  [_book]: (value) => `${value} is a book`,
})

const test3 = pipe(
  bookExample,
  variant.caseOf({
    [_book]: (value) => `${value} is a book`,
    [_film]: (value) => `${value} is a film`,
    [_song]: (value) => `${value} is a film`,
  })
)

const test4 = pipe(
  filmExample,
  variant.caseOfWithDefault(`Default Case`)({
    [_book]: (value) => `${value} is a book`,
  })
)

console.log(test)
console.log(test2)
console.log(test3)
console.log(test4)
