/**
 * 嵌套对象键类型
 * 用于生成对象所有可能的嵌套键路径字符串类型
 * @example
 * // 对于类型 { a: { b: string, c: number } }
 * // 生成的类型为 "a" | "a.b" | "a.c"
 */
export type NestedKeyOf<ObjectType extends object> =
{[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: `${Key}`
}[keyof ObjectType & (string)];

/**
 * 从对象中获取字符串类型的值
 * @param object 要查询的对象
 * @param path 键路径，如 "a.b.c"
 * @returns 字符串值，如果路径不存在或值不是字符串则返回 null
 */
export function getString<ObjectType>(object: Partial<ObjectType>, path: string): string | null {
  if (object == undefined) {
    return null;
  }

  const result = findValueFromPath(object, path);
  if (typeof result === 'string') {
    return result;
  }

  return null;
}

/**
 * 从对象中获取数字类型的值
 * @param object 要查询的对象
 * @param path 键路径，如 "a.b.c"
 * @returns 数字值，如果路径不存在或值不是数字则返回 null
 */
export function getNumber<ObjectType>(object: Partial<ObjectType>, path: string): number | null {
  if (object == undefined) {
    return null;
  }

  const result = findValueFromPath(object, path);
  if (typeof result === 'number') {
    return result;
  }

  return null;
}

/**
 * 从对象中获取布尔类型的值
 * @param object 要查询的对象
 * @param path 键路径，如 "a.b.c"
 * @returns 布尔值，如果路径不存在或值不是布尔则返回 null
 */
export function getBoolean<ObjectType>(object: Partial<ObjectType>, path: string): boolean | null {
  if (object == undefined) {
    return null;
  }

  const result = findValueFromPath(object, path);
  if (typeof result === 'boolean') {
    return result;
  }

  return null;
}

/**
 * 根据路径从对象中查找值
 * @param object 要查询的对象
 * @param path 键路径，如 "a.b.c"
 * @returns 找到的值，如果路径不存在则返回 null
 */
function findValueFromPath<ObjectType>(object: Partial<ObjectType>, path: string): unknown {
  path = path.replace('..', '.'); // 将连续的两个点转换为单个点，以便后续正确处理空键值
  const keys = path.split('.');

  // '.' 也是一个实际的键，所以需要确保如果最后一个值为空，则将其设置为点
  if (keys != null && keys[keys.length - 1] == '') {
    keys[keys.length - 1] = '.';
  }

  let result = object;
  for (const key of keys) {
    // @ts-ignore 忽略 result 技术上是 any 类型的事实
    result = result[key];

    if (result == undefined) {
      return null;
    }
  }

  return result;
}