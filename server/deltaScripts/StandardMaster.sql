Alter Table StandardMaster MODIFY remarks longtext;


INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('1', 'I-First', '1st', 1, "1", now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('2', 'II-Second', '2nd', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('3', 'III-Third', '3rd ', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('4', 'IV-Fourth', '4th ', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('5', 'V-Fifth', '5th ', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('6', 'VI-Sixth', '6th', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('7', 'VII- Seventh', '7th', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('8', 'VIII-Eighth', '8th', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('9', 'IX-Ninth', '9th', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('10', 'X-Tenth', 'SSC', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('11', 'XI-Eleventh', 'FYJC', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('12', 'XII-Twelth', 'SYJC', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('13', 'XIII-Thirteenth', 'FY', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('14', 'XIV-Fourteenth', 'SY', 1, 1, now(), now());
INSERT INTO StandardMaster(std, stdCode, remarks, createdBy, status, createdAt, updatedAt)values('15', 'XV-Fifteenth', 'TY', 1, 1, now(), now());

update table StandardMaster set remarks="7th" where id=7;

update StandardMaster set remarks="9th" where id=9;
