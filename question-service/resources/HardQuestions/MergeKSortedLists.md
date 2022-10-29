# [23\. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

## Description

Difficulty: **Hard**  

Related Topics: [Linked List](https://leetcode.com/tag/linked-list/), [Divide and Conquer](https://leetcode.com/tag/divide-and-conquer/), [Heap (Priority Queue)](https://leetcode.com/tag/heap-priority-queue/), [Merge Sort](https://leetcode.com/tag/merge-sort/)


You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

_Merge all the linked-lists into one sorted linked-list and return it._

**Example 1:**

```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
```

**Example 2:**

```
Input: lists = []
Output: []
```

**Example 3:**

```
Input: lists = [[]]
Output: []
```

**Constraints:**

*   `k == lists.length`
*   0 <= k <= 10<sup>4</sup>
*   `0 <= lists[i].length <= 500`
*   -10<sup>4</sup> <= lists[i][j] <= 10<sup>4</sup>
*   `lists[i]` is sorted in **ascending order**.
*   The sum of `lists[i].length` will not exceed 10<sup>4</sup>.


## Solution

Language: **C++**

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        
    }
};
```