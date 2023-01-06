
-- rd: [a] -> [a]
-- rd.[x] = [x]
-- rd.(x :: y :: xs) = x :: rd.(rdhelper.(xs).y)

-- rdhelper: [a] -> a -> [a]
-- rdhelper.[x].y = [x]
-- rdhelper.(x :: xs).y = if y == x then rdhelper.(xs).y else x :: rdhelper.xs.y


-- rd.l = foldr.(\i -> i :: filter.(\c -> c /= i).l).[].l


rd.l = foldr.(addIfnotPresent).[].l
  

-- addIfnotPresent.i.l = i :: filter.(\c -> c /= i).l
addIfnotPresent.i.l = i :: filter.((/=).i).l


-- addIfnotPresent.i = (filter.((\=).i));((::).i)

-- addIfnotPresent = \i -> (filter.(\=).i);((::).i)




-- --------------------------

-- "abbcab" -> [('a', [1,5]), ('b', [2,3,6]), ('c', [4])]

-- pos.l = [i | i <- [1...length.l], ]

-- posOf.e = map.((==).e)



