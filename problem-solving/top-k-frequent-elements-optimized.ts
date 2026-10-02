/**
 * Top K Frequent Elements (LeetCode 347) — Optimized
 * --------------------------------------------------
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
 * Optimized: O(n + U log k) — min-heap capped at size k.
 * (see top-k-frequent-elements-unoptimized.ts which heaps all uniques: O(U log U)).
 *
 * Run this file with:
 *   npx tsx problem-solving/top-k-frequent-elements-optimized.ts
 */

import { PriorityQueue } from "../Priority_Queue.js";

export function topKFrequent(nums: number[], k: number): number[] {
  // Total O(n + U log k), space O(U + k). n = nums.length, U = # uniques.
  const freqMap = new Map<number, number>(); // O(1) init
  for (const n of nums) { // x n iterations => O(n)
    freqMap.set(n, (freqMap.get(n) ?? 0) + 1); // O(1) avg Map get/set
  } // counting total: O(n) time, O(U) space

  // Min-heap by freq, keep only k largest.
  const pq = new PriorityQueue<{ num: number; freq: number }>((a, b) => a.freq - b.freq); // O(1) init

  for (const [num, freq] of freqMap.entries()) { // x U iterations
    pq.enqueue({ num, freq }); // O(log k) — heap capped at k+1
    if (pq.size() > k) { // O(1)
      pq.dequeue(); // O(log k) — evict smallest, at most once per entry
    }
  } // heap phase total: O(U log k) time, O(k) heap space

  const result: number[] = []; // O(1), grows to O(k)
  while (!pq.isEmpty()) { // x k iterations
    const top = pq.dequeue(); // O(log k)
    if (top !== undefined) result.push(top.num); // O(1)
  } // drain total: O(k log k)
  return result; // O(1)
} // Grand total: O(n) + O(U log k) + O(k log k) = O(n + U log k)

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
