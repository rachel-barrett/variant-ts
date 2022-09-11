import * as variant from "src/churchVariant"
import Variant = variant.Variant
import { assertEquals, group, test } from "@rachel-barrett/test-js"

type Media = Variant<{
  book: number
  film: string
  song: string
}>

const Media = variant.module<Media>({
  book: value => variant.tagged(_book, value),
  film: value => variant.tagged(_film, value),
  song: value => variant.tagged(_song, value),
})

const _book = "book"
const _film = "film"
const _song = "song"

// examples

const bookExample = Media.book(123)

const whatAmI: (media: Media) => string = media =>
  media({
    book: value => `${value} is a book!`,
    film: value => `${value} is a film!`,
    song: value => `${value} is a song!`,
  })

// tests

group("churchVariant")(() => {
  test("pattern matching")(() => {
    const expected = "123 is a book!"
    const actual = whatAmI(bookExample)
    return assertEquals({ actual, expected })
  })
})
