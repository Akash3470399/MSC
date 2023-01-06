

--pushToEach.[
--      [[1], [2]], 
--      [[2], [3]]
--      ].[4] 
--      ===>
-- [
--      [[4, 1], [2]], 
--      [[1], [4, 2]], 
--      [[4, 2], [3]], 
--      [[2], [4, 3]]
-- ]

-- push a to each sublist
pushToEach: [[[a]]] -> [a] -> [[[a]]]
pushToEach.l.e = [(take.(i-1).subList) ++ [(e ++ (last.(take.i.subList)))] ++ (drop.i.subList) | subList <- l, i <- [1...length.subList]]

--  splitSet.[1,2,3,4] => [[[1], [2], [3], [4]]]
-- splits the set into singular sets
splitSet: [a] -> [[[a]]]
splitSet.l = [[[e] | e <- l]]

-- addToList.[
--     [[1],[2]], 
--     [[3],[4]]
--     ].[5] ==>
-- [
--     [[5], [1], [2]], 
--     [[5], [3], [4]]
--     ]

addToList: [[[a]]] -> [a] -> [[[a]]] 
addToList.l.a = [a :: subList | subList <- l]

g: Int -> Int -> [[[Int]]]
g.n.1 = [[[ 1...n]]]
g.n.k = if n > k then 
                pushToEach.((g.(n-1).k) ).[n]  ++ addToList.(g.(n - 1).(k -1)).[n]
           else
                splitSet.([1...n])
