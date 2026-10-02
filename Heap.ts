export type Comparator<T> = (a: T, b: T) => number;

export class Heap<T> {
  private arr: T[];
  private compare: Comparator<T>;

  constructor(inputArr: T[] = [], compare: Comparator<T>) {
    this.compare = compare;
    this.arr = [...inputArr];
    this.heapify();
  }

  printArr() {
    console.log(...this.arr)
  }

  push(el: T): void {
    this.arr.push(el);
    this.bubbleUp();
  }

  pop(): T | undefined {
    if (this.arr.length === 0) return undefined;
    if (this.arr.length === 1) return this.arr.pop();

    const res = this.arr[0];
    this.arr[0] = this.arr.pop() as T;
    this.bubbleDown(0);

    return res;
  }

  peek(): T | undefined {
    return this.arr[0];
  }

  size(): number {
    return this.arr.length;
  }

  isEmpty(): boolean {
    return this.arr.length === 0;
  }

  heapify(): void {
    for (let i = Math.floor(this.arr.length / 2) - 1; i >= 0; i--) {
      this.bubbleDown(i);
    }
  }

  getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i: number): number {
    return 2 * i + 1;
  }

  getRightChildIndex(i: number): number {
    return 2 * i + 2;
  }

  bubbleDown(i: number): void {
    while (true) {
      const l = this.getLeftChildIndex(i);
      const r = this.getRightChildIndex(i);

      let smallest = i;

      if (l < this.arr.length && this.compare(this.arr[l], this.arr[smallest]) < 0) {
        smallest = l;
      }

      if (r < this.arr.length && this.compare(this.arr[r], this.arr[smallest]) < 0) {
        smallest = r;
      }

      if (smallest === i) {
        break;
      }

      this.swap(i, smallest);
      i = smallest;
    }
  }

  bubbleUp(): void {
    let i = this.arr.length - 1;

    while (i > 0) {
      const parent = this.getParentIndex(i);
      if (this.compare(this.arr[i], this.arr[parent]) >= 0) break;
      this.swap(i, parent);
      i = parent;
    }
  }

  swap(i: number, p: number): void {
    const temp = this.arr[i];
    this.arr[i] = this.arr[p];
    this.arr[p] = temp;
  }
}
