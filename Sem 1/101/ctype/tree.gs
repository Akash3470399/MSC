ctype Tree where
	Node : Int-> Tree -> Tree -> Tree
	ETree : Tree

-- gives the height of a tree
heightOf : Tree -> Int
heightOf.ETree = 0
heightOf.(Node.n.l.r) = 1 + max.(heightOf.l).(heightOf.r)

-- function to check if the right subtree is empty 
rEmpty.ETree = True
rEmpty.(Node.d.l.r) = if r == ETree && l /= ETree then True else False 

-- push a node/tree to tree (left to right adding on a layer)
pushTree : Tree-> Tree -> Tree
pushTree.ETree.node_ = node_
-- puhhNode.(Node.n.l.r).ETree = Node.n.l.r
pushTree.(Node.n.l.r).node_ =   if heightOf.l - heightOf.r == 1 && rEmpty.l then Node.n.(pushTree.l.node_).r
				else if heightOf.l <= heightOf.r then Node.n.(pushTree.l.node_).r
			     	else Node.n.l.(pushTree.r.node_)

-- function to find sum of all nodes
sumOfElm : Tree -> Int
sumOfElm.ETree = 0    
sumOfElm.(Node.n.l.r) = n + sumOfElm.l + sumOfElm.r                                                     


-- function to find the nodes greater than a node
gtrThan : Tree -> Tree -> [Tree]
gtrThan.ETree.n = []
gtrThan.(Node.n.l.r).(Node.key.ETree.ETree) = if n > key then 
					       (Node.n.ETree.ETree :: gtrThan.l.(Node.key.ETree.ETree)) ++ gtrThan.r.(Node.key.ETree.ETree)
					      else gtrThan.l.(Node.key.ETree.ETree) ++ gtrThan.r.(Node.key.ETree.ETree)



-- function to get path of each node
path : Tree -> [(Int, [Char])]
path.tree_ = pHelper.tree_.""

pHelper : Tree -> [Char] -> [(Int,[Char])]

pHelper.ETree.subPath = []
pHelper.(Node.n.l.r).subPath = (n, subPath) :: pHelper.l.(subPath ++ "l") ++ pHelper.r.(subPath ++ "r") 


-- function to get leafs
getLeafs : Tree -> [Tree]
getLeafs.ETree = []
getLeafs.(Node.n.l.r) = if l == ETree && r == ETree then 
				[(Node.n.ETree.ETree)] 
			else getLeafs.l ++ getLeafs.r


