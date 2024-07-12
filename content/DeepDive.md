---
title: "Finding a Peak in an Unsorted List: A Deep Dive"
description: "I struggled with a coding assessment, so I decided to practice and write a tutorial to enhance my problem-solving skills. The tutorial includes clear explanations, Python code implementations, and practical examples."
date: "2024-07-04"
author: "Simangaliso Vilakazi"
---

## Introduction

I recently failed a coding assessment test for a job opportunity. I did not do well and it felt like a slap in the face, a wake-up call. So I've chosen to use this setback as motivation to improve my skills by practicing solving complex problems, at least once a week for the next 6 months and sharing my knowledge through tutorials. This tutorial aims to simplify the concept of finding a peak element in an unsorted list of integers, as well as to demonstrate a more efficient solution.

In this tutorial, we will explore an algorithmic problem: finding a peak element in an unsorted list of integers. We aim to identify a peak element from the given unsorted list, where a peak element is one that is greater than or equal to its neighboring elements.

## The Naive Approach:

The straightforward and commonly known approach to solve this problem is to sequentially iterate through the list and compare each pair of consecutive elements to identify a peak element. However, this approach has a time complexity of O(n), where n is the size of the list.

## A Better Solution:

We can enhance the efficiency of our solution by utilizing a modified binary search algorithm, enabling us to solve this problem in O(log n) time. This may seem surprising considering the unsorted nature of the elements.

Here's a breakdown of the algorithm:

1. If the list is empty, return None.
2. If the list has only one element, that element is a peak. Return it.
3. Examine the middle element of the list.
4. If the middle element is greater than or equal to both of its neighbors, it's a peak. Return it.
5. If the middle element is less than its left neighbor, there must be a peak in the left half of the list. Repeat the process on the left half.
6. If the middle element is less than its right neighbor, there must be a peak in the right half of the list. Repeat the process on the right half.

Now, let's implement this algorithm in Python:

```python
def find_peak(list_of_integers):
    if not list_of_integers:
        return None

    left, right = 0, len(list_of_integers) - 1

    while left < right:
        mid = (left + right) // 2
        if list_of_integers[mid] > list_of_integers[mid + 1]:
            right = mid
        else:
            left = mid + 1

    return list_of_integers[left]
```

Consider a few examples to test our implementation:

```python
print(find_peak([1, 2, 4, 6, 3]))  # Should print 6
print(find_peak([4, 2, 1, 2, 3, 1]))  # Should print 4
print(find_peak([2, 2, 2]))  # Should print 2
print(find_peak([]))  # Should print None
print(find_peak([-2, -4, 2, 1]))  # Should print 2
print(find_peak([4, 2, 1, 2, 2, 2, 3, 1]))  # Should print 4
```

In conclusion, this problem demonstrates the applicability of binary search-like solutions to problems for which it might not be immediately obvious. My plan is to practice such problems at least once a week in order to improve. I believe had I been doing this all along, I would've aced the assessment, but we live and we learn, I guess. I hope this tutorial helps you; writing it sure did help me.
