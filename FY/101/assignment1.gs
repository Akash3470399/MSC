
-- 01. Third.[‘M’,’G’,’J’,’B’,’G’] ->‘J’
third: [a] -> a
third.(x::y::z::xs) = z 

-- 02. secondLast.[4,2,8,7,123,65,87,99,34,12]  -> 34

secondLast: [a] -> a
secondLast.[x,y] = x
secondLast.(x::xs) = secondLast.xs

-- 03. sumUpto.10 -> 55

sumUpto: Int -> Int
sumUpto.0 = 0
sumUpto.n = n + sumUpto.(n-1)

-- 04. addfirst.[4,3,7,6,5].[123,65,43,67] -> 127

addFirst: [Int] -> [Int] -> Int
addFirst.(x::xs).(y::ys) = x + y

-- 05. tableof.12.5 -> [12,24,36,48,60]

tableof: Int -> Int -> [Int]
tableof.x.1 = [x]
tableof.x.n = tableof.x.(n-1) ++ [x*n]

-- 06. HowmanyBiggerThan.[3,5,3,8,9,10,6,5,3].7 -> 3
howManyBiggerThan: [Int] -> Int -> Int
howManyBiggerThan.[].n = 0
howManyBiggerThan.(x::xs).n = if x > n then 1 + howManyBiggerThan.xs.n 
                                                 else howManyBiggerThan.xs.n

-- 07. addOddElm.[4,9,2,8,1,3,13] -> 26 (9 + 1 + 3 + 13)
addOddElm.[] = 0
addOddElm.(x::xs) = if mod.x.2 == 0 then addOddElm.xs
                                 else x + addOddElm.xs

-- 08 ReplaceEven.[3,2,1,9,4]  -> Not valid as list can contain only same type of elements

-- 09 Removeoddlist.[[1,2],[6,5,4,3,2],[3,4,5],[5],[6,4,3,2]] ->  [[1,2],[6,4,3,2]]
isListOdd:[a] -> Bool
isListOdd.[] = False
isListOdd.[x] = True
isListOdd.(x::y::xs) = isListOdd.xs 

removeOddList: [[a]] -> [[a]]
removeOddList.[] = []
removeOddList.(x::xs) = if isListOdd.(x) == True then removeOddList.xs
                                      else x :: removeOddList.xs

-- 10. CompareList.[3,2,1,9,4].[4,3,2,1,4]  = [0, 0, 0, 1, 1]
compareList: [Int]->[Int] -> [Int]
compareList.[].[] = []
compareList.(x::xs).(y::ys) = if x > y then 1 :: compareList.xs.ys
                                            else 0 :: compareList.xs.ys

-- 11. reverseAddone.[3,2,1,9,4] -> [5,10,2,3,4]
reverseAddOne: [Int] -> [Int]
reverseAddOne.[] = []
reverseAddOne.(x::xs) = reverseAddOne.xs ++ [x + 1]

-- 12 func.5 -> 13
func: Int -> Int
func.n = n*2 + 3

--13. smallest.[3,2,1,9,4] 
smallest.[x] = x 
smallest.(x::y::xs) = if x < y then smallest.(x::xs) 
                               else smallest.(y::xs)

-- secondBigs.[[3,2,1,9,4],[4,3,5],[2,1],[4,13,2,1,5,6,7,8,89]] ->  [4,4,2,13]
--secondBigs: [[Int]] -> [Int]
--secondBigs.(x::xs) 

removeGreatest.[x] = []
removeGreatest.(x::y::xs) = if x > y then removeGreatest.(x::xs) ++ [y]
                                            else removeGreatest.(y::xs) ++ [x]





-- 14. secondBigList. [[3,2,1,9,4],[4,3,5],[2,1],[4,13,2,1,5,6,7,8,89]] -> [4,4,2,13]

-- remove biggest number from a list
removeBig : [Int] -> [Int]
removeBig.[x] = []
removeBig.(x :: y :: xs ) = if x > y then y :: removeBig.(x::xs)
                                        else x :: removeBig.(y :: xs)
-- returns biggest number from a list
getBiggest.[x] = x
getBiggest.(x :: y :: xs) = if x > y then getBiggest.(x :: xs) 
                                       else getBiggest.(y::xs)

secondBigList: [[Int]] -> [Int]
secondBigList.[] = []
secondBigList.(x :: xs) = getBiggest.(removeBig.(x)) :: secondBigList.xs

-- 15. factor.10 = [1,2,5,10]
factor.n = getFactors.n.n

getFactors.x.1 = [1]
getFactors.x.n = if mod.x.n == 0 then getFactors.x.(n-1) ++ [n]
                           else getFactors.x.(n-1)

-- 16. joinlist.[3,4].[3,6,7].[1]  -> [3,4,3,6,7,1]
joinTwoList.[].y = y
joinTwoList.(x::xs).y = x :: joinTwoList.(xs).y 

joinList.x.y.z = joinTwoList.(joinTwoList.x.y).z

-- 17. collatz.n 

collatz : Int -> [Int]
collatz.1 = [1]
collatz.n = if mod.n.2 == 0 then n :: collatz.(n/2)
                 else n :: collatz.((n*3) + 1)

-----------------------------------------------
-- 18 remDup.[5,3,2,5,3,8,3,0,1] = [5,3,2,8,0,1]

mySort.[x] = [x]
mySort.(x :: y :: xs) = if x < y then x :: mySort.(y :: xs)
                                  else mySort.(y :: xs)

remDup : [Int] -> [Int]
remDup.[x] = [x]
remDup.(x :: y :: xs) = if x == y then x :: remDup.(xs)
                                  else x :: remDup.(y::xs)


-- 19. listSize4.[5,3,2,5,3,8,3,0,1] -> False

listSize4.[] = True
listSize4.(p::q::r::s::xs) = listSize4.xs
listSize4.y = False

-- 20. random.x.y = either x or y



f.[] = [0]
f.[x] = [0]
f.(x :: y:: xs) = (y - x) :: f.(y::xs)
                                   








s.(x::xs)=x+s.xs
s.[]=0
rpa.(x::xs)=(x+s.xs)::rpa.xs
rpa.[]=[]
