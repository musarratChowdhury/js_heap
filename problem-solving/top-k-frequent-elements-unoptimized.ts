/**
 * Top K Frequent Elements (LeetCode 347)
 * ---------------------------------------
 * Given an integer array `nums` and an integer `k`, return the `k` most
 * frequent elements. You may return the answer in any order.
 *
 * Example 1:
 *   Input: nums = [1,1,1,2,2,3], k = 2
 *   Output: [1,2]
 *
 * Example 2:
 *   Input: nums = [1], k = 1
 *   Output: [1]
 *
 * Constraints:
 *   - 1 <= nums.length <= 10^5
 *   - -10^4 <= nums[i] <= 10^4
 *   - k is in the range [1, the number of unique elements in the array]
 *   - It is guaranteed that the answer is unique.
 *
 * Follow up: Your algorithm's time complexity must be better than O(n log n),
 * where n is the array's size.
 *
 * Run this file with:
 *   npx tsx problem-solving/top-k-frequent-elements-unoptimized.ts
 */

import { PriorityQueue } from "../Priority_Queue.js";

// Unoptimized: total O(n + U log U), space O(U).
// n = nums.length, U = # unique numbers.
// Heap holds ALL uniques as max-heap, then pop k.
export function topKFrequent(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>(); // O(1) time/space init

  const pq = new PriorityQueue<{ num: number; freq: number }>((a, b) => b.freq - a.freq); // O(1) init max-heap

  for (const n of nums) { // x n iterations => O(n)
    freqMap.set(n, (freqMap.get(n) ?? 0) + 1); // O(1) avg Map get/set
  } // total counting: O(n) time, O(U) space

  for (const [num, freq] of freqMap.entries()) { // x U iterations
    pq.enqueue({ num, freq }); // O(log U) bubbleUp, heap grows to U
  } // total heap build: O(U log U) time, O(U) space

  const result: number[] = []; // O(1), will grow to O(k)
  for (let i = 0; i < k; i++) { // x k iterations
    const top = pq.dequeue(); // O(log U) bubbleDown
    if (top !== undefined) result.push(top.num); // O(1)
  } // total extraction: O(k log U)
  return result; // O(1)
} // Grand total: O(n) + O(U log U) + O(k log U) = O(n + U log U)

// --- Test harness (feel free to add your own cases) ---

function isSameUnordered(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((v, i) => v === sortedB[i]);
}

function runTests(): void {
  const cases: { nums: number[]; k: number; expected: number[] }[] = [
    { nums: [1, 1, 1, 2, 2, 3], k: 2, expected: [1, 2] },
    { nums: [1], k: 1, expected: [1] },
    { nums: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4], k: 2, expected: [4, 3] },
  ];

  let passed = 0;
  for (const { nums, k, expected } of cases) {
    const result = topKFrequent(nums, k);
    const ok = isSameUnordered(result, expected);
    if (ok) passed++;
    console.log(
      `${ok ? 'PASS' : 'FAIL'}: topKFrequent([${nums}], ${k}) => [${result}] (expected [${expected}])`
    );
  }
  console.log(`\n${passed}/${cases.length} tests passed.`);
}

runTests();
