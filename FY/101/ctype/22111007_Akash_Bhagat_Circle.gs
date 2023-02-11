ctype Entity where
      KeyPerson,Father,Mother,Sister,Brother,Spouse,Son,Daughter,Relative,Friend : (String,String,String,String,Int) -> Entity

-- The Datatype of Entity is Unique_Key,Name,Gender (Male or Female),Marital Status (Married or Unmarried) and Year of Birth


ctype Family where
      FamilyData : [Entity] -> Family

ctype Relatives where
      RelativesData : [Entity] -> Relatives

ctype Friends where
      FriendsData : [Entity] -> Friends
            
ctype Circle where
      Network : Entity -> (Family,Relatives,Friends) -> Circle


-------------------------------------------------------- SAMPLE DATA BELOW

ankit = KeyPerson.("91908298","Ankit","Male","Married",1973)
father = Father.("u8782733","Abhijeet","Male","Married",1957)
mother = Mother.("8728744","Ketaki","Female","Married",1960)
sister = Sister.("8728745","Sonali","Female","UnMarried",1990)

ankit_family = FamilyData.[father,mother,sister]


himadri = Relative.("9190829811","Himadri","Female","UnMarried",1983)
chetan = Relative.("128728745","Chetan","Male","Married",1978)

ankit_relatives = RelativesData.[himadri,chetan]


ajay = Friend.("459190829811","Ajay","Male","Married",1981)
rakesh = Friend.("459829811","Rakesh","Male","Married",1984)

ankit_friends = FriendsData.[ajay,rakesh]

ankit_circle = Network.ankit.(ankit_family,ankit_relatives,ankit_friends)

--------------------------------------------------------  END OF SAMPLE DATA



-- On gofer console try finding the type of mycircle,ankit_friends , ankit_relatives, ankit_family and ankit/father/rakesh and see what it gives you


-- Q1. Given a circle, find number of people in the circle (function name has to be count_circle)

count_circle.(Network.per.(FamilyData.fal, RelativesData.rel, FriendsData.fri)) = length.fal + length.rel + length.fri

-- Q2. Given a circle, give the name of all the people in that circle (function name has to be people_circle)
-- give_name : [Entity] -> [Char]
get_name_of_Entity.(KeyPerson.(key, name, gen, mar, year)) = name
get_name_of_Entity.(Father.(key, name, gen, mar, year)) = name
get_name_of_Entity.(Mother.(key, name, gen, mar, year)) = name
get_name_of_Entity.(Sister.(key, name, gen, mar, year)) = name
get_name_of_Entity.(Brother.(key, name, gen, mar, year)) = name
get_name_of_Entity.(Spouse.(key, name, gen, mar, year)) = name
get_name_of_Entity.(Son.(key, name, gen, mar, year)) = name
get_name_of_Entity.(Daughter.(key, name, gen, mar, year)) = name
get_name_of_Entity.(Relative.(key, name, gen, mar, year)) = name
get_name_of_Entity.(Friend.(key, name, gen, mar, year)) = name

give_name.[] = []
give_name.(e::es) = get_name_of_Entity.e :: give_name.es 
people_circle.(Network.per.(FamilyData.fal, RelativesData.rel, FriendsData.fri)) = give_name.fal ++ give_name.rel ++ give_name.fri

-- Q3. Give a circle and id of the person, remove that person from circle and return the new circle (function name has to be remove_circle)



get_id.(Father.(key, name, gen, mar, year)) = key
get_id.(Mother.(key, name, gen, mar, year)) = key
get_id.(Sister.(key, name, gen, mar, year)) = key
get_id.(Brother.(key, name, gen, mar, year)) = key
get_id.(Spouse.(key, name, gen, mar, year)) = key
get_id.(Son.(key, name, gen, mar, year)) = key
get_id.(Daughter.(key, name, gen, mar, year)) = key
get_id.(Relative.(key, name, gen, mar, year)) = key
get_id.(Friend.(key, name, gen, mar, year)) = key

rem_per : [Entity] -> [Char] -> [Entity]
rem_per.[].id = []
rem_per.(e::es).id = if get_id.e == id then es else e :: rem_per.es.id

remove_circle.(Network.per.(FamilyData.fal, RelativesData.rel, FriendsData.fri)).id = rem_per.fal.id ++ rem_per.rel.id ++ rem_per.fri.id


-- Q4. Given 2 circles (c1 and c2) How the Network c1 will change if both the key people of c1 and c2 gets married (function name has to be new_network_circle) 

-- new_network_circle : Circle -> Circle -> (Circle, Circle)
-- new_network_circle.(Network.per1.(FamilyData.fal1, RelativesData.rel1, FriendsData.fri1)).(Network.per2.(FamilyData.fal2, RelativesData.rel2, FriendsData.fri2)) = (Network.per1.(FamilyData.fal1, RelativesData.rel1 ++ FamilyData.fal2, FriendsData.fri1)).(Network.per2.(FamilyData.fal2, RelativesData.rel2 ++ FamilyData.fal1, FriendsData.fri2))