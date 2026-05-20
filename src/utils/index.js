//#region 获取全局唯一 ID
export const getUniqueId = () => {
  // 兼容浏览器与其他 JS 运行时，优先从 globalThis 上取 crypto。
  const cryptoObj = typeof globalThis !== "undefined" ? globalThis.crypto : null;

  // 第一优先级：原生 UUID，随机性最好且冲突概率最低。
  if (cryptoObj && typeof cryptoObj.randomUUID === "function") {
    return cryptoObj.randomUUID();
  }

  // 第二优先级：使用安全随机数生成 16 字节十六进制字符串。
  if (cryptoObj && typeof cryptoObj.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    let id = "";
    for (let i = 0; i < bytes.length; i += 1) {
      id += bytes[i].toString(16).padStart(2, "0");
    }
    return id;
  }

  // 最后兜底：时间戳 + 普通随机数，保证在旧环境也能用。
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2);
  return `${time}-${rand}`;
};
//#endregion

//#region 单例模式
// 使用 Symbol.for，确保不同模块/运行分片拿到同一个全局 key。
const SINGLETON_REGISTRY_KEY = Symbol.for("__app_singleton_registry__");
const singletonRegistry =
  // 把注册表挂到 globalThis 上，保证跨模块导入共享同一份单例实例。
  globalThis[SINGLETON_REGISTRY_KEY] ||
  (globalThis[SINGLETON_REGISTRY_KEY] = new WeakMap());

export function createSingleton(ClassRef) {
  const isClass =
    typeof ClassRef === "function" &&
    /^class\s/.test(Function.prototype.toString.call(ClassRef));
  if (!isClass) {
    throw new TypeError("useSingleton 参数必须是 class");
  }

  const proxy = new Proxy(ClassRef, {
    construct(target, args, newTarget) {
      if (!singletonRegistry.has(target)) {
        singletonRegistry.set(
          target,
          Reflect.construct(target, args, newTarget),
        );
      }
      return singletonRegistry.get(target);
    }
  });
  return proxy;
}

export const useSingleton = (ClassRef) => createSingleton(ClassRef);

//#endregion
