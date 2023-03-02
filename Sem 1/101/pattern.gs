
getNearBys : Int -> [Int]
getNearBys.n = if n == 1 then [2, 5, 4]
                         else if n == 2 then [1, 3, 4, 5, 6]
                         else if n == 3 then [2, 5, 6]
                         else if n == 4 then [1, 2, 5, 8,7]
                         else if n == 5 then [1, 2, 3, 4, 6, 7, 8, 9]
                         else if n == 6 then [2, 3, 5, 8, 9]
                         else if n == 7 then [4, 5, 8]
                         else if n == 8 then [7, 4, 5, 6, 9]
                         else [5, 6, 8]

removeXsfromY: [a] -> [a] -> [a] -- removeXsfromY.[1,2].[1,2,3,1,2,4,1,1,1,6] ==> [3, 4, 6]
removeXsfromY.[].y = y
removeXsfromY.(x :: xs).y = removeXsfromY.xs.(filter.((/=).x).y)

pattern : Int -> [[Int]] 
pattern.1 = [[1], [2], [3], [4], [5], [6], [7], [8], [9]]
pattern.n = upgradeLevel.(pattern.(n-1))

upgradeLevel : [[Int]] -> [[Int]]
upgradeLevel.l = [subPat ++ [next_item] | subPat <- l, next_item <- removeXsfromY.subPat.(getNearBys.(last.(subPat)))]