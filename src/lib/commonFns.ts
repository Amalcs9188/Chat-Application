
export function formDefaultValue<T extends object>(data: T) {
  return (Object.keys(data) as (keyof T)[]).map((key) => ({
    name: key,
    value: data[key],
  }));
}
