use GameWeb;

--------------------User--------------------

create table user_table(
	user_id int identity(1,1) not null primary key,
	user_login nvarchar(20) not null,
	user_password nvarchar(30) not null,
	user_name nvarchar(20) not null,
	user_surname nvarchar(30) not null,
	user_role int default 0
);

insert into user_table(user_login, user_password, user_name, user_surname, user_role) 
values('MrWeebeez', 'Pa$$w0rd', 'Yury', 'Karlenok', 1);
insert into user_table(user_login, user_password, user_name, user_surname) 
values('Tart', 'Pa$$w0rd', 'Andrey', 'Karlenok');

select * from user_table;

delete from user_table where user_id > 2

drop table user_table;

--------------------Location--------------------

create table location_table(
	location_id int identity(1,1) not null primary key,
	location_name nvarchar(30) not null,
	location_x int not null,
	location_y int not null,
	location_z int not null,
	location_min_level int not null,
	location_max_level int not null,
	location_image nvarchar(100)
);

insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Faralon', 0, 0, 0, 11, 15);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Tanaan jungle', 1, 0, 0, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Ashran', 2, 0, 0, 11, 15);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Hijal', 0, 1, 0, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Pentagramm city', 1, 1, 0, 1, 5);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Karazhan', 2, 1, 0, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Suramar', 0, 2, 0, 11, 15);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Brill', 1, 2, 0, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Acerus', 2, 2, 0, 11, 15);

insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Ashenvale', 0, 0, 1, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Orgrimmar', 1, 0, 1, 1, 5);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Alterac', 2, 0, 1, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Darnas', 0, 1, 1, 1, 5);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Nexus', 1, 1, 1, 16, 20);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Stormwind', 2, 1, 1, 1, 5);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Gilneas', 0, 2, 1, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Naxxramas', 1, 2, 1, 1, 5);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Stratholme', 2, 2, 1, 6, 10);

insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Azshara', 0, 0, 2, 11, 15);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Nagrand', 1, 0, 2, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Shattrath', 2, 0, 2, 11, 15);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Exodar', 0, 1, 2, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Silver town', 1, 1, 2, 1, 5);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Talador', 2, 1, 2, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Dark shores', 0, 2, 2, 11, 15);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Shadow lands', 1, 2, 2, 6, 10);
insert into location_table(location_name, location_x, location_y, location_z, location_min_level, location_max_level) 
values('Ulduar', 2, 2, 2, 11, 15);

update location_table set location_image = 'image\Location\Ulduar.png' where location_name = 'Ulduar'

select * from location_table;

drop table location_table;

--------------------Race--------------------

create table race_table(
	race_id int identity(1,1) not null primary key,
	race_name nvarchar(20) not null,
	race_location int not null,
	constraint race_location_fk foreign key (race_location) REFERENCES location_table(location_id) ON DELETE CASCADE
);

insert into race_table(race_name, race_location) 
values('Elf', 13);
insert into race_table(race_name, race_location) 
values('Orc', 11);
insert into race_table(race_name, race_location) 
values('Human', 15);
insert into race_table(race_name, race_location) 
values('Undead', 17);
insert into race_table(race_name, race_location) 
values('Angel', 23);
insert into race_table(race_name, race_location) 
values('Demon', 5);

select * from race_table;

drop table race_table;

--------------------Class--------------------

create table class_table(
	class_id int identity(1,1) not null primary key,
	class_name nvarchar(20) not null
);

insert into class_table(class_name) 
values('Warrior');
insert into class_table(class_name) 
values('Killer');
insert into class_table(class_name) 
values('Mage');
insert into class_table(class_name) 
values('Support');

select * from class_table;

drop table class_table;

--------------------Race_Class--------------------

create table race_class_table(
	race_class_id int identity(1,1) not null primary key,
	race_class_race int not null,
	race_class_class int not null,
	race_class_image nvarchar(50) not null,
	constraint race_class_race_fk foreign key (race_class_race) REFERENCES race_table(race_id) ON DELETE CASCADE,
	constraint race_class_class_fk foreign key (race_class_class) REFERENCES class_table(class_id) ON DELETE CASCADE
);

insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(1, 1, 'image/Character/Elf_Warrior.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(1, 2, 'image/Character/Elf_Killer.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(1, 3, 'image/Character/Elf_Mage.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(1, 4, 'image/Character/Elf_Support.png');

insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(2, 1, 'image/Character/Orc_Warrior.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(2, 2, 'image/Character/Orc_Killer.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(2, 3, 'image/Character/Orc_Mage.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(2, 4, 'image/Character/Orc_Support.png');

insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(3, 1, 'image/Character/Human_Warrior.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(3, 2, 'image/Character/Human_Killer.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(3, 3, 'image/Character/Human_Mage.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(3, 4, 'image/Character/Human_Support.png');

insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(4, 1, 'image/Character/Undead_Warrior.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(4, 2, 'image/Character/Undead_Killer.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(4, 3, 'image/Character/Undead_Mage.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(4, 4, 'image/Character/Undead_Support.png');

insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(5, 1, 'image/Character/Angel_Warrior.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(5, 2, 'image/Character/Angel_Killer.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(5, 3, 'image/Character/Angel_Mage.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(5, 4, 'image/Character/Angel_Support.png');

insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(6, 1, 'image/Character/Demon_Warrior.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(6, 2, 'image/Character/Demon_Killer.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(6, 3, 'image/Character/Demon_Mage.png');
insert into race_class_table(race_class_race, race_class_class, race_class_image) 
values(6, 4, 'image/Character/Demon_Support.png');

select * from race_class_table;

drop table race_class_table;

--------------------Character--------------------

create table character_table(
	character_id int identity(1,1) not null primary key,
	character_user int not null,
	character_name nvarchar(20) not null,
	character_race int not null,
	character_class int not null,
	character_location int not null,
	character_level int default 1 not null,
    character_exp int default 0 not null,
    character_health int default 40 not null,
    character_max_health int default 40 not null,
    character_mana int default 20 not null,
    character_max_mana int default 20 not null,
    character_power int default 5 not null,
    character_speed int default 3 not null,
    character_mind int default 3 not null,
	constraint character_user_fk foreign key (character_user) REFERENCES user_table(user_id) ON DELETE CASCADE,
	constraint character_race_fk foreign key (character_race) REFERENCES race_table(race_id) ON DELETE CASCADE,
	constraint character_class_fk foreign key (character_class) REFERENCES class_table(class_id) ON DELETE CASCADE,
	constraint character_location_fk foreign key (character_location) REFERENCES location_table(location_id) ON DELETE NO ACTION
);

insert into character_table(character_user, character_name, character_race, character_class, character_location) 
values(1, 'Grolle', 4, 3, 17);
insert into character_table(character_user, character_name, character_race, character_class, character_location) 
values(1, 'Alastor', 6, 2, 5);
insert into character_table(character_user, character_name, character_race, character_class, character_location) 
values(2, 'Toaster', 3, 4, 15);

select * from character_table;

drop table character_table;

--------------------Item--------------------

create table item_table (
	item_id int identity(1,1) not null primary key,
	item_name nvarchar(30) not null,
	item_type nvarchar(10) not null,
	item_health int default 0 not null,
	item_mana int default 0 not null,
	item_power int default 0 not null,
	item_speed int default 0 not null,
	item_mind int default 0 not null,
	item_image nvarchar(50)
);

insert into item_table(item_name, item_type, item_speed, item_image) values ('Horse', 'Mount', 25, 'image\Item\Horse.png');
insert into item_table(item_name, item_type, item_speed, item_image) values ('Not horse', 'Mount', 25, 'image\Item\Horse.png');

select * from item_table;

update item_table set item_image = 'image\Item\Heart.png' where item_name = 'Heart'

drop table item_table;

--------------------Character_Item--------------------

create table character_item_table (
	character_item_id int identity(1,1) not null primary key,
	character_item_character int not null,
	character_item_item int not null,
	constraint character_item_character_fk foreign key (character_item_character) REFERENCES character_table(character_id) ON DELETE CASCADE,
	constraint character_item_item_fk foreign key (character_item_item) REFERENCES item_table(item_id) ON DELETE CASCADE
);

insert into character_item_table(character_item_character, character_item_item) values (35, 1);
insert into character_item_table(character_item_character, character_item_item) values (35, 2);

select * from character_item_table;

drop table character_item_table;

--------------------Skill--------------------

create table skill_table (
	skill_id int identity(1,1) not null primary key,
	skill_name nvarchar(30) not null,
	skill_type nvarchar(10) not null,
	skill_race int not null,
	skill_class int not null,
	skill_health int not null,
	skill_mana int not null,
	skill_level int not null,
	skill_image nvarchar(50),
	constraint skill_race_fk foreign key (skill_race) REFERENCES race_table(race_id) ON DELETE CASCADE,
	constraint skill_class_fk foreign key (skill_class) REFERENCES class_table(class_id) ON DELETE CASCADE
);

insert into skill_table(skill_name, skill_type, skill_race, skill_class, skill_health, skill_mana, skill_level, skill_image) 
values ('Hook', 'Damage', 4, 1, 10, 5, 5, 'image\Skill\Undead_Warrior\Hook.png');
insert into skill_table(skill_name, skill_type, skill_race, skill_class, skill_health, skill_mana, skill_level, skill_image) 
values ('Rot', 'Heal', 4, 1, 10, 5, 10, 'image\Skill\Undead_Warrior\Rot.png');
insert into skill_table(skill_name, skill_type, skill_race, skill_class, skill_health, skill_mana, skill_level, skill_image) 
values ('Slam', 'Damage', 4, 1, 15, 10, 15, 'image\Skill\Undead_Warrior\Slam.png');
insert into skill_table(skill_name, skill_type, skill_race, skill_class, skill_health, skill_mana, skill_level, skill_image) 
values ('Gorge', 'Damage', 4, 1, 25, 15, 20, 'image\Skill\Undead_Warrior\Gorge.png');

insert into skill_table(skill_name, skill_type, skill_race, skill_class, skill_health, skill_mana, skill_level, skill_image) 
values ('Whoop', 'Damage', 3, 2, 5, 5, 5, 'image\Skill\Human_Killer\Whoop.png');

select * from skill_table;

drop table skill_table;

--------------------Monster--------------------

create table monster_table(
	monster_id int identity(1,1) not null primary key,
	monster_name nvarchar(20) not null,
	monster_race int not null,
	monster_class int not null,
	monster_location int not null,
	monster_level int not null,
    monster_health int not null,
    monster_max_health int not null,
    monster_mana int not null,
    monster_max_mana int not null,
    monster_power int not null,
    monster_speed int not null,
    monster_mind int not null,
	monster_image nvarchar(50),
	constraint monster_race_fk foreign key (monster_race) REFERENCES race_table(race_id) ON DELETE CASCADE,
	constraint monster_class_fk foreign key (monster_class) REFERENCES class_table(class_id) ON DELETE CASCADE,
	constraint monster_location_fk foreign key (monster_location) REFERENCES location_table(location_id) ON DELETE NO ACTION
);

insert into monster_table(monster_name, monster_race, monster_class, monster_location, monster_level, 
monster_health, monster_max_health, monster_mana, monster_max_mana, monster_power, monster_speed, monster_mind, monster_image) 
values ('Minion', 3, 1, 14, 1, 15, 15, 10, 10, 2, 1, 1, 'image\Monster\Minion.png');

update monster_table set monster_race = 3, monster_class = 2, monster_level = 10 where monster_name = 'Minion' 

select * from monster_table;

drop table monster_table;

--------------------Monster_Item--------------------

create table monster_item_table (
	monster_item_id int identity(1,1) not null primary key,
	monster_item_monster int not null,
	monster_item_item int not null,
	monster_item_chance int not null,
	constraint monster_item_monster_fk foreign key (monster_item_monster) REFERENCES monster_table(monster_id) ON DELETE CASCADE,
	constraint monster_item_item_fk foreign key (monster_item_item) REFERENCES item_table(item_id) ON DELETE CASCADE
);

insert into monster_item_table(monster_item_monster, monster_item_item, monster_item_chance) values (1, 1, 75);
insert into monster_item_table(monster_item_monster, monster_item_item, monster_item_chance) values (1, 2, 25);

select * from monster_item_table;

drop table monster_item_table;

--------------------Npc--------------------

create table npc_table(
	npc_id int identity(1,1) not null primary key,
	npc_name nvarchar(30) not null,
	npc_race int not null,
	npc_prof nvarchar(10) not null,
	npc_location int not null,
	npc_level int not null,
	npc_image nvarchar(50),
	constraint npc_race_fk foreign key (npc_race) REFERENCES race_table(race_id) ON DELETE CASCADE,
	constraint npc_location_fk foreign key (npc_location) REFERENCES location_table(location_id) ON DELETE NO ACTION
);

insert into npc_table(npc_name, npc_race, npc_prof, npc_location, npc_level, npc_image) values ('Deckard', 3, 'Librarian', 14, 5, 'image\NPC\Deckard.png');
insert into npc_table(npc_name, npc_race, npc_prof, npc_location, npc_level, npc_image) values ('Test', 3, 'Test', 14, 5, 'image\NPC\Deckard.png');

select * from npc_table;

drop table npc_table;

--------------------User_Character--------------------

select character_table.character_id, character_table.character_name, race_table.race_name, class_table.class_name, location_table.location_name 
from character_table inner join user_table on character_table.character_user = user_table.user_id
inner join race_table on character_table.character_race = race_table.race_id
inner join class_table on character_table.character_class = class_table.class_id
inner join location_table on character_table.character_location = location_table.location_id
where user_table.user_login = 'MrWeebeez';

select count(*) from character_table inner join user_table on character_table.character_user = user_table.user_id
where user_table.user_login = 'MrWeebeez';

select * from race_table;

select * from user_table;
delete from character_table where character_id > 3;

select character_table.character_id, character_table.character_name, race_table.race_name, class_table.class_name, location_table.location_name, 
race_class_table.race_class_image
from character_table inner join user_table on character_table.character_user = user_table.user_id
inner join race_table on character_table.character_race = race_table.race_id
inner join class_table on character_table.character_class = class_table.class_id
inner join location_table on character_table.character_location = location_table.location_id
inner join race_class_table on race_table.race_id = race_class_table.race_class_race and class_table.class_id = race_class_table.race_class_class
where user_table.user_login = 'MrWeebeez'
order by character_level desc;

delete from character_table inner join user_table on character_table.character_user = user_table.user_id
where user_table.user_login = 'MrWeebeez' and character_table.character_name = 'Yura';

select * from race_table;
select * from class_table;

select location_id from race_table inner join location_table on race_table.race_location = location_table.location_id where race_id = 1;

update character_table set character_table.character_level = 3 where character_table.character_name = 'alastor'

select character_table.character_id, character_table.character_name, race_table.race_name, class_table.class_name, location_table.location_name 
from character_table inner join user_table on character_table.character_user = user_table.user_id
inner join race_table on character_table.character_race = race_table.race_id
inner join class_table on character_table.character_class = class_table.class_id
inner join location_table on character_table.character_location = location_table.location_id
where user_table.user_login = 'MrWeebeez' and character_table.character_name = 'Pudge'


select location_x from character_table inner join user_table on character_table.character_user = user_table.user_id inner join location_table on character_table.character_location = location_table.location_id where user_table.user_login = 'MrWeebeez' and character_table.character_name = 'Pudge'


select location_name, location_x, location_y, location_z, location_min_level, location_max_level, 
location_x - (select location_x from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = 'Pudge') as location_x_dir,
location_y - (select location_y from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = 'Pudge') as location_y_dir,
location_z - (select location_z from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = 'Pudge') as location_z_dir
FROM location_table where 
(abs(location_x - (select location_x from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = 'Pudge')) + 
abs(location_y - (select location_y from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = 'Pudge')) + 
abs(location_z - (select location_z from character_table inner join location_table on character_table.character_location = location_table.location_id where character_table.character_name = 'Pudge')) < 2) 


update character_table set character_table.character_location = 1 
where character_table.character_name = 'alastor'


select monster_table.monster_id, monster_table.monster_name, race_table.race_name, class_table.class_name, location_table.location_name, 
monster_table.monster_level, monster_table.monster_health, monster_table.monster_max_health, monster_table.monster_mana, monster_table.monster_max_mana, 
monster_table.monster_power, monster_table.monster_speed, monster_table.monster_mind,  monster_table.monster_image, 
sum(item_table.item_health) item_health, sum(item_table.item_mana) item_mana, 
sum(item_table.item_power) item_power, sum(item_table.item_speed) item_speed, sum(item_table.item_mind) item_mind 
from monster_table inner join race_table on monster_table.monster_race = race_table.race_id 
inner join class_table on monster_table.monster_class = class_table.class_id 
inner join location_table on monster_table.monster_location = location_table.location_id 
left join monster_item_table on monster_table.monster_id = monster_item_table.monster_item_monster 
left join item_table on monster_item_table.monster_item_item = item_table.item_id 
where monster_table.monster_name = 'Minion' 
group by monster_table.monster_id, monster_table.monster_name, race_table.race_name, class_table.class_name, location_table.location_name, 
monster_table.monster_level, monster_table.monster_health, monster_table.monster_max_health, monster_table.monster_mana, monster_table.monster_max_mana, 
monster_table.monster_power, monster_table.monster_speed, monster_table.monster_mind, monster_table.monster_image

select npc_table.npc_id, npc_table.npc_name, race_table.race_name, npc_table.npc_prof, location_table.location_name,  
npc_table.npc_level, npc_table.npc_image 
from npc_table inner join race_table on npc_table.npc_race = race_table.race_id 
inner join location_table on npc_table.npc_location = location_table.location_id 
where location_table.location_name = 'Nexus' and npc_table.npc_name like '%' order by npc_name asc

select * from character_table

update character_table set character_health = 1 where character_name = 'Test'

select * from monster_item_table

insert into character_ite