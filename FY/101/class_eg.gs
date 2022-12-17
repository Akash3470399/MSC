
-- function to retern size of list
count: [a] -> Int
count.[] = 0
count.(x :: xs) = 1 + count.xs

-- add all elements of list
addAll.[] = 0
addAll.(x :: xs) = x + addAll.xs

-- get last element of list

lastElement.[x] = x
lastElement.(x :: xs) = lastElement.xs


-- Increment each list element by 1
incEach: [Int] -> [Int]
incEach.[] = []
incEach.(x :: xs) = x+ 1 :: incEach.xs

-- reverse a list
reverseList.[] = []
reverseList.(x :: xs ) = reverseList.xs ++ [x]

-- add first element of each sublist
addFirst.[] = 0
addFirst.(x :: xs) = first.x + addFirst.xs where first.(y :: ys) = y + 0

-- fibonachi serise
fib.1 = 1
fib.2 = 1
fib.n = fib.(n-1) + fib.(n-2)

-- check if a list is of even length
isEven.[] = True
isEven.[x] = False
isEven.(x :: y :: xs) = isEven.xs

-- 