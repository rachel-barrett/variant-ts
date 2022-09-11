import * as variant from "src/churchVariant"
import Variant = variant.Variant
import { assertEquals, group, test } from "@rachel-barrett/test-js"

export type Media = Variant<{
  book: number
  film: string
  song: string
}>

// This isn't totally type constrained as you can choose any tag to go with any function name
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

const show: (media: Media) => string = media =>
  media({
    book: value => `Book: ${value}`,
    film: value => `Film: ${value}`,
    song: value => `Song: ${value}`,
  })

// tests

group("churchVariant")(() => {
  test("pattern matching")(() => {
    const expected = "Book: 123"
    const actual = show(bookExample)
    return assertEquals({ actual, expected })
  })
})
