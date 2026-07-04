export function useMDXComponents<T extends Record<string, unknown>>(
  components: T
): T {
  return {
    ...components
  };
}
