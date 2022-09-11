// The advantage of this module over the variant module is just that there is no dependency on union types (variants are built from their church encoding in terms of records and functions)
// The disadvantage is that console.log does not work for church variants
// and also looks like select function is not as constrained as we would like
// other than that the modules are the same

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

// This is actually not fully type constrained as Map[typeof key] is the union type of all the keys not just the one selected key
export function select<Map extends { [key: string]: any }>(
  key: keyof Map
): (value: Map[typeof key]) => Variant<Map> {
  return value => cases => cases[key](value)
}
