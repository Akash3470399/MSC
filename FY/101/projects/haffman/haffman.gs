ctype Tree where
	Node : Tree -> Int -> Tree -> Tree
	Leaf : (Char, Int) -> Tree

remove : a -> [a] -> [a]
remove.(ch) = filter.((/=).ch)
getFreq : a -> [a] -> Int
getFreq.ch.l = length.(filter.((==).ch).l)

-- function to push a Tree(Node) into sorted list of trees(Nodes)
push : Tree -> [Tree] -> [Tree]

push.(Leaf.(ch, frq)).[] = [Leaf.(ch, frq)]
push.(Node.t1.frq.t2).[] = [Node.t1.frq.t2]

push.(Leaf.(ch, frq)).((Node.t1.fr.t2) :: xs) = if frq > fr then (Node.t1.fr.t2) :: push.(Leaf.(ch, frq)).(xs)
						else Leaf.(ch, frq):: (Node.t1.fr.t2) :: xs

push.(Leaf.(ch, frq)).((Leaf.(c1, fr)) :: xs) = if frq > fr then Leaf.(c1, fr) :: push.(Leaf.(ch, frq)).(xs)
                                                else Leaf.(ch, frq):: (Leaf.(c1, fr)) :: xs

push.(Node.t1.frq.t2).((Leaf.(c1, fr)) :: xs) = if frq > fr then Leaf.(c1, fr) :: push.(Node.t1.frq.t2).(xs)
                                                else (Node.t1.frq.t2) :: (Leaf.(c1, fr)) :: xs

push.(Node.t1.frq.t2).((Node.t3.fr.t4) :: xs) = if frq > fr then (Node.t3.fr.t4) :: push.(Node.t1.frq.t2).(xs)
						else (Node.t1.frq.t2) :: (Node.t3.fr.t4) :: xs

-- join the list of trees into single tree
-- while joining selects 2 Trees with minimum frequency
join : [Tree] -> Tree
join.[x] = x
join.((Node.t1.f1.t2) :: (Node.t3.f2.t4) :: tree_) = join.(push.(Node.(Node.t1.f1.t2).(f1 + f2).(Node.t3.f2.t4)).tree_)
join.((Leaf.(ch1, f1)) :: (Leaf.(ch2, f2)) :: tree_) = join.(push.(Node.(Leaf.(ch1, f1)).(f1 + f2).(Leaf.(ch2, f2))).tree_)
join.((Node.t1.f1.t2) :: (Leaf.(ch2, f2)) :: tree_) = join.(push.(Node.(Node.t1.f1.t2).(f1 + f2).(Leaf.(ch2, f2))).tree_)
join.((Leaf.(ch1, f1)) :: (Node.t3.f2.t4) :: tree_) = join.(push.(Node.(Leaf.(ch1, f1)).(f1 + f2).(Node.t3.f2.t4)).tree_)

-- function to create list of leafs from a string along with their frequency
createLeaves : [Char] -> [Tree] -> [Tree]
createLeaves.[].l = l
createLeaves.(c ::cs).l = push.(Leaf.(c, (getFreq.c.(c::cs)))).(createLeaves.(remove.c.cs).l)

-- function to get path of each node in the tree 
getPaths:Tree -> [Char] -> [(Char, [Char])]
getPaths.(Leaf.(c, f)).subPath = [(c, subPath)]
getPaths.(Node.t1.f.t2).subPath = getPaths.t1.(subPath ++ ['0']) ++ getPaths.t2.(subPath ++ ['1'])

-- master function to create encoding table of string
getTree.str = getPaths.(join.(createLeaves.str.[])).""

-- function to get the path of char from list of tuple of char and path
pathOf : Char -> [(Char, [Char])] -> [Char]
pathOf.ch = (filter.(\(c, path) -> ch == c) ; (head ;  \(c,p) -> p)) -- (\(c2,p) -> p))

-- encode the string using encoding table generated from the encoding tree
streamBuilder : [Char] -> [(Char, [Char])] -> [Char]
streamBuilder.[].t = "" 
streamBuilder.(c :: cs).table = (pathOf.c.table) ++ streamBuilder.cs.table


getBitStream.str = streamBuilder.str.(getTree.str)



-- binary to decimal
btod : [Char] -> Int
btod.[] = 0
btod.(b :: bs) = if b == '1' then 2^(length.bs) + btod.(bs)
                 else btod.bs

-- Break the bits stream into chuncks of 7
createChuncks : [Char] -> [Char] -> Int -> [[Char]]
createChuncks.[].temp.n = [temp]
createChuncks.(c :: cs).temp.n = if length.temp < n then createChuncks.cs.(temp++[c]).n
                                 else temp :: createChuncks.(c :: cs)."".n

-- push n '0' to str
append0 : [Char] -> Int -> [Char]
append0.str.0 = str
append0.str.n = append0.(str++"0").(n-1)

-- create string of from the chuncks of binary bits
-- if last chunck has length less then 7 then increase its length by appending 0 to it & put a that count as last chunck
chuncks : [[Char]] -> [Char]
chuncks.[] = []
chuncks.(c :: cs) = if length.c == 7 then chr.(btod.c) :: chuncks.cs
                    else [chr.(btod.(append0.(c).(7-length.c))), chr.(48 + (7 - length.c))] 

encodeTree : [(Char, [Char])] -> [Char]
encodeTree.[] = []
encodeTree.((c, f) :: ns) = (f++[c]) ++ encodeTree.ns



-------------------------- ***************** main compressor ******************** -------------------------------------------------
-- main comprsseing function -> returns compressed string & string of tree encoded		   
compress.str = [chuncks.(createChuncks.(streamBuilder.str.(getTree.str))."".7), encodeTree.(getTree.str)]
-------------------------- ****************************************************** -----------------------------------------------



------------------------------------ decompressor -------------------------------------------------------------

-- funciton to recreate tree create form encoded tree string
decodeTree.(c ::cs) = chelp.(c::cs).""

chelp.[].code = []
chelp.(c :: cs).code = if isDigit.c then chelp.cs.(code ++ [c]) 
                   else (c, code) :: chelp.cs.""
itoa.n = chr.(48+n)
atoi.ch = ord.ch - 48

-- function to convert decimal to binary
dtob.0 = "0"
dtob.1 = "1"
dtob.n = dtob.(n/2) ++ dtob.(mod.n.2)

push0.str.0 = str
push0.str.n = push0.('0' :: str).(n-1)

-- create list of Bit stream form char of compressed msg 
hStream.[] = []
hStream.[x, y] = if length.(dtob.(ord.x)) == 7 then  [take.(ord.y -48).(dtob.(ord.x))]
			 else [take.(ord.y - 48).(push0.(dtob.(ord.x)).(7-length.(dtob.(ord.x))))]
hStream.(c :: cs) =  dtob.(ord.c) :: hStream.cs

-- create a single bits stram form list of bit stram
-- joinStream.bsl = foldr.((++)).[].bsl
getStream.msg = foldr.((++)).[].(hStream.msg)


t = [('l',"0"), ('o',"10"), ('h',"110"), ('e',"111")]

-- function to check if code is valid or not
isValCode.code.l = if length.(filter.(\(ch, path) -> path == code).l) == 0 then False else True

-- code to char
codeToChar.code.l =  (filter.(\(ch, path) -> path == code)  ; (head; (\(c, p) -> c))).l

-- create message back from bits with the help of tree
createMsg.[].code.tree = []
createMsg.(b :: bs).code.tree = if isValCode.code.tree then codeToChar.code.tree :: createMsg.(b::bs)."".tree
                                else createMsg.bs.(code++[b]).tree

------------------------------ ************** decompressor ************** ----------------------------------

decompress.[x, y] = createMsg.(getStream.x)."".(decodeTree.(y))
------------------------------ ****************************************** 
