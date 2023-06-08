INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Alex', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1270067126/pt/foto/smiling-indian-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Uxyoin6A5yJLc_a8XLeukKteiTZmenne9t38Isz0QS4=');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Maria', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://i.pinimg.com/originals/76/ef/b7/76efb7c94755748d695d3d46cf11d08d.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bob', 'bob@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://escolalbk.com.br/wp-content/uploads/2021/11/barbeiro-1024x681.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bryan', 'bryan@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1265576300/photo/portrait-of-cheerful-mid-adult-black-man-in-casual-clothing.jpg?s=612x612&w=0&k=20&c=NlxtrL8x6M5fCrEt8CXuqIJ8BWqes47DhTixMKP5b0s=');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Julia', 'julia@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-11/deep-brain-stimulation-binge-eating-tease-zz-221129-f275db.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Michael', 'michael@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.licdn.com/dms/image/C4E03AQExWt4Qx4Guqw/profile-displayphoto-shrink_800_800/0/1571951379640?e=2147483647&v=beta&t=50KfpRgOc32U1WDsdl5fB6YHjkrIf6mNJ_-O1-C6FgE');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Jenny', 'jenny@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('James', 'james@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyQOdoM34P3-4NVwSZjVu8zWGDxEPIlCkIg&usqp=CAU');

INSERT INTO tb_role (authority) VALUES ('ROLE_CLIENT');
INSERT INTO tb_role (authority) VALUES ('ROLE_BARBER');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 3);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (4, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (5, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (6, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (6, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (7, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (8, 1);

INSERT INTO tb_appointment (barber_id, client_id, date_Time) VALUES (3, 6, TIMESTAMP WITH TIME ZONE '2020-07-14T10:30:00Z');
INSERT INTO tb_appointment (barber_id, client_id, date_Time) VALUES (2, 1, TIMESTAMP WITH TIME ZONE '2023-06-08T19:30:00Z');
INSERT INTO tb_appointment (barber_id, client_id, date_Time) VALUES (2, 5, TIMESTAMP WITH TIME ZONE '2023-06-09T00:30:00Z');
INSERT INTO tb_appointment (barber_id, client_id, date_Time) VALUES (2, 4, TIMESTAMP WITH TIME ZONE '2023-06-08T20:30:00Z');
INSERT INTO tb_appointment (barber_id, client_id, date_Time) VALUES (2, 7, TIMESTAMP WITH TIME ZONE '2023-06-10T02:30:00Z');
INSERT INTO tb_appointment (barber_id, client_id, date_Time) VALUES (2, 8, TIMESTAMP WITH TIME ZONE '2023-06-10T00:00:00Z');
