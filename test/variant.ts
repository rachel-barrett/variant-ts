import * as variant from "src/variant"
import Variant = variant.Variant
import { pipe } from "fp-ts/function"
import { assertEquals, group, test } from "@rachel-barrett/test-js"

export type Media = Variant<{
  book: number
  film: string
  song: string
}>

// Alternative:
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
  book: value => variant.tagged(_book, value),
  film: value => variant.tagged(_film, value),
  song: value => variant.tagged(_song, value),
})

const _book = "book"
const _film = "film"
const _song = "song"

// examples

export const bookExample = Media.book(123)
export const filmExample = Media.film("Avatar")

const showMatch: (media: Media) => string = media =>
  variant.match(media)({
    [_book]: value => `Book: ${value}`,
    [_film]: value => `Film: ${value}`,
    [_song]: value => `Song: ${value}`,
  })

const isBookMatch: (media: Media) => boolean = media =>
  variant.matchWithDefault(media)(false)({
    [_book]: () => true,
  })

const showCaseof: (media: Media) => string = media =>
  pipe(
    media,
    variant.caseOf({
      [_book]: value => `Book: ${value}`,
      [_film]: value => `Film: ${value}`,
      [_song]: value => `Song: ${value}`,
    })
  )

const isBookCaseOf: (media: Media) => boolean = media =>
  pipe(
    media,
    variant.caseOfWithDefault(false)({
      [_book]: () => true,
    })
  )

// tests

group("variant")(() => {
  test("match")(() => {
    const expected = "Book: 123"
    const actual = showMatch(bookExample)
    return assertEquals({ actual, expected })
  })
  test("caseOf")(() => {
    const expected = "Book: 123"
    const actual = showCaseof(bookExample)
    return assertEquals({ actual, expected })
  })
  test("caseOfWithDefault")(() => {
    assertEquals({ actual: isBookCaseOf(bookExample), expected: true })
    return assertEquals({ actual: isBookCaseOf(filmExample), expected: false })
  })
  test("matchWithDefault")(() => {
    assertEquals({ actual: isBookMatch(bookExample), expected: true })
    return assertEquals({ actual: isBookMatch(filmExample), expected: false })
  })
})
