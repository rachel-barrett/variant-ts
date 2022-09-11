// This is an experimental module that shouldn't really be used

// The advantage of this module over the variant module is just that there is no dependency on union types
// (variants are built from their church encoding in terms of records and functions)
// Which means this code can work in any language which has records and functions
// The disadvantage though is that console.log is not helpful for church variants
// which is enough to make this module not really usable for me.
// Another disadvantage is that we can't make a caseOfWithDefault

// ## type

export type Variant<Map extends { [key: string]: any }> = <A>(cases: {
  [Key in keyof Map]: (value: Map[Key]) => A
}) => A

// ## module

export type Module<Variant extends (a: any) => any> = {
  [Key in keyof Map<Variant>]: (value: Map<Variant>[Key]) => Variant
}

// The type of Variant (V) is not very constrained which is because:
// If you try to constrain V by doing V extends Variant<Record<string, any>>
// and create a type = Variant.Map<Media>, it complains that
// "Type 'Media' does not satisfy the constraint 'Variant<{ [key: string]: any; }>'".
// " Type '{ [x: string]: (value: any) => any; }' is missing the following properties from type '{ book: (value: number) => any; film: (value: string) => any; song: (value: string) => any; }': book, film, songts(2344)"
// which suggests it doesn't think the Variant type constructor is covariant
// which it isn't - the Variant functor is invariant.

export type Map<Variant extends (a: any) => any> = {
  [Key in keyof Parameters<Variant>[0]]: Parameters<
    Parameters<Variant>[0][Key]
  >[0]
}

// this is an identity function that just exists to give better type descriptions
export function module<Variant extends (a: any) => any>(
  constructors: Module<Variant>
): Module<Variant> {
  return constructors
}

export function tagged<Key extends string, Map extends Record<Key, any>>(
  key: Key,
  value: Map[Key]
): Variant<Map> {
  return cases => cases[key](value)
}
