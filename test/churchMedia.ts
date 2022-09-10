import * as variant from "src/churchVariant";
import Variant = variant.Variant;

export type Media = Variant<{
  book: number;
  film: string;
  song: string;
}>;

// This isn't totally type constrained as you can choose any tag to go with any function name
export const Media = variant.module<Media>({
  book: (value) => variant.select("book")(value),
  film: (value) => variant.select("film")(value),
  song: (value) => variant.select("song")(value),
});

// examples

export const bookExample = Media.book(123);

const test = bookExample({
  book: (value) => `${value} is a book`,
  film: (value) => `${value} is a film`,
  song: (value) => `${value} is a song`,
});

console.log(test);
