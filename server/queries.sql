CREATE TABLE guestbook (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  massage TEXT,
  guest_name TEXT,
  hosts_name TEXT
)

INSERT INTO guestbook (massage, guest_name, hosts_name) VALUES ('Hi','Tom','Luke');
INSERT INTO guestbook (massage, guest_name, hosts_name) VALUES ('How are you','Ben','Luke');
INSERT INTO guestbook (massage, guest_name, hosts_name) VALUES ('What you been up to','Fread','Luke');
INSERT INTO guestbook (massage, guest_name, hosts_name) VALUES ('Hope your doing well','John','Haley');
INSERT INTO guestbook (massage, guest_name, hosts_name) VALUES ('See you soon','Jim','Haley');
INSERT INTO guestbook (massage, guest_name, hosts_name) VALUES ('Have fun','Dean','Haley');
