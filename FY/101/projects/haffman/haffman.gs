ctype Tree where
	Node : Tree -> Int -> Tree -> Tree
	Leaf : (Char, Int) -> Tree



-- createLeaves.(ch :: str).l = if isIn.(s, l) == True then push.(incFreq.(getLeaf.ch.l)).(remove.ch.l)
--                             else push.(Leaf.(ch, 1)).l
-- is1 = filter.(\(l) -> l ==1)
-- function to find if leaf of a char ch is present in list of leafs
remove, getLeaf: Char -> [Tree] -> [Tree]
isIn : Char -> [Tree] -> Bool
isIn.ch.l = if filter.(\(Leaf.(c, f)) -> c == ch).l  == [] then False else True
getLeaf.ch.l = filter.(\(Leaf.(c, f)) -> c == ch).l
remove.ch.l = filter.(\(Leaf.(c, f)) -> c /= ch).l
incFreq.[(Leaf.(ch, freq))] = Leaf.(ch, freq+1)

createLeaves : [Char] -> [Tree] -> [Tree]

createLeaves.(ch :: chs).l = if isIn.ch.l == True then push.(incFreq.(getLeaf.ch.l)).(remove.ch.l)
                             else push.(Leaf.(ch, 1)).l


-- frq : frequency of Leaf node to be push
-- fr : freqency of node from list


-- function to push a Tree(Node) into sorted list of trees(Nodes)
push : Tree -> [Tree] -> [Tree]

push.(Leaf.(ch, frq)).[] = [Leaf.(ch, frq)]
push.(Node.t1.frq.t2).[] = [Node.t1.frq.t2]

push.(Leaf.(ch, frq)).((Node.t1.fr.t2) :: xs) = if frq > fr then (Node.t1.fr.t2) :: push.(Leaf.(ch, frq)).(xs)
						else Leaf.(ch, frq):: (Node.t1.fr.t2) :: xs

push.(Leaf.(ch, frq)).((Leaf.(c1, fr)) :: xs) = if frq > fr then Leaf.(c1, fr) :: push.(Leaf.(ch, frq)).(xs)
                                                else Leaf.(ch, frq):: (Leaf.(c1, fr)) :: xs

push.(Node.t1.frq.t2).((Leaf.(c1, fr)) :: xs) = if frq > fr then (Node.t1.fr.t2) :: push.(Node.t1.frq.t2).(xs)
                                                else (Node.t1.frq.t2) :: (Leaf.(c1, fr)) :: xs

push.(Node.t1.frq.t2).((Node.t3.fr.t4) :: xs) = if frq > fr then (Node.t3.fr.t4) :: push.(Node.t1.frq.t2).(xs)
						else (Node.t1.frq.t2) :: (Node.t3.fr.t4) :: xs

join : [Tree] -> Tree
join.[x] = x
join.((Node.t1.f1.t2) :: (Node.t3.f2.t4) :: tree_) = join.(push.(Node.(Node.t1.f1.t2).(f1 + f2).(Node.t3.f2.t4)).tree_)
join.((Leaf.(ch1, f1)) :: (Leaf.(ch2, f2)) :: tree_) = join.(push.(Node.(Leaf.(ch1, f1)).(f1 + f2).(Leaf.(ch2, f2))).tree_)
join.((Node.t1.f1.t2) :: (Leaf.(ch2, f2)) :: tree_) = join.(push.(Node.(Node.t1.f1.t2).(f1 + f2).(Leaf.(ch2, f2))).tree_)
join.((Leaf.(ch1, f1)) :: (Node.t3.f2.t4) :: tree_) = join.(push.(Node.(Leaf.(ch1, f1)).(f1 + f2).(Node.t3.f2.t4)).tree_)

