import { Heap, type Comparator } from "./Heap.js";

export class PriorityQueue<T> {
  private heap: Heap<T>;

  constructor(comparer: Comparator<T>) {
    this.heap = new Heap<T>([], comparer);
  }

  enqueue(el: T): void {
    this.heap.push(el);
  }

  dequeue(): T | undefined {
    return this.heap.pop();
  }

  peek(): T | undefined {
    return this.heap.peek();
  }

  size(): number {
    return this.heap.size();
  }

  isEmpty(): boolean {
    return this.heap.isEmpty();
  }
}
