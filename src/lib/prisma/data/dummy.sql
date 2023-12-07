
INSERT INTO post (location_id, location, type) VALUES
  (1, 'Location One', 'Branch'),
  (2, 'Location Two', 'Hub'),
  (3, 'Location Three', 'Branch');


INSERT INTO user (uuid, email, full_name, password, location_id, role) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'sonanhnguyen003@gmail.com', 'User One', '12345678', 1, 'BranchManager'),
  ('550e8400-e29b-41d4-a716-446655440001', '1@gmail.com', 'User One', '12345678', 1, 'BranchManager'),
  ('9f47d0a4-95de-4a92-bdc5-02115f55e10a', 'user2@example.com', 'User Two', 'password2', 2, 'HubManager'),
  ('c7c15091-99a0-4efb-98c9-dff46a865bd5', 'user3@example.com', 'User Three', 'password3', 3, 'BranchStaff');

INSERT INTO package (package_id, weight, send_date, type, sender_name_location, sender_phone_number, sender_id, receiver_name_location, receiver_id, receiver_phone_number)
VALUES
  (1, 5.5, '2023-01-01', 'Type X', 'Sender One', '123-456-7890', 1, 'Receiver One', 2, '987-654-3210'),
  (2, 7.2, '2023-02-01', 'Type Y', 'Sender Two', '987-654-3210', 2, 'Receiver Two', 3, '123-456-7890');


INSERT INTO status (package_id, location_id, received_date, transported_date, success) VALUES
  (1, 1, '2023-01-02', '2023-01-03', true),
  (2, 2, '2023-02-02', NULL, false);