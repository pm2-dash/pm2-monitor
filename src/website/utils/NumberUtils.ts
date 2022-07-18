export class NumberUtils {
  static sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  static formatMemory(mem: number) {
    const increment = (mem: number, i: number): [number, number] => {
      if (mem > 1024) return increment(mem / 1024, i + 1)
      else return [mem, i]
    }

    const incremented = increment(mem, 0)
    return `${incremented[0].toFixed(2)} ${
      this.sizes[incremented[1]] ?? this.sizes[this.sizes.length]
    }`
  }
}
