-- Dummy data for 'package' model
INSERT INTO package (weight, send_date, type, sender_name_location, sender_phone_number, sender_id, receiver_name_location, receiver_id, receiver_phone_number)
VALUES
  (2.5, '2023-12-01', 'Fragile', 'John Doe, New York', '1234567890', 1, 'Jane Doe, Los Angeles', 2, '9876543210'),
  (1.8, '2023-12-02', 'Standard', 'Alice Smith, Chicago', '1112223333', 3, 'Bob Johnson, Houston', 4, '4445556666');

-- Dummy data for 'post' model
INSERT INTO post (location, type, received_package, transported_package)
VALUES
  ('New York Hub', 'Hub', 2, 1),
  ('Los Angeles Branch', 'Branch', 1, 2);

-- Dummy data for 'post_history' model
INSERT INTO post_history (post_id, package_id, request_date, verified_date)
VALUES
  (1, 1, '2023-12-01', '2023-12-02'),
  (2, 2, '2023-12-02', '2023-12-03');

-- Dummy data for 'status' model
INSERT INTO status (package_id, post_id, received_date, transported_date, success, location)
VALUES
  (1, 1, '2023-12-02', '2023-12-03', true, 'New York Hub'),
  (2, 2, '2023-12-03', NULL, NULL, 'Los Angeles Branch');

-- Dummy data for 'user' model
INSERT INTO user (uuid, email, full_name, password, post_id, role)
VALUES
  ('abc123', 'john.doe@example.com', 'John Doe', 'hashedpassword1', 1, 'HubManager'),
  ('def456', 'jane.smith@example.com', 'Jane Smith', 'hashedpassword2', 2, 'BranchStaff');

-- Additional dummy data for 'package' model
INSERT INTO package (weight, send_date, type, sender_name_location, sender_phone_number, sender_id, receiver_name_location, receiver_id)
VALUES
  (3.2, '2023-12-03', 'Express', 'Eva White, Seattle', '5556667777', 5, 'Mike Brown, Denver', 6);

-- Additional dummy data for 'post' model
INSERT INTO post (location, type, received_package, transported_package)
VALUES
  ('Seattle Hub', 'Hub', 1, 1),
  ('Denver Branch', 'Branch', 2, 0);

-- Additional dummy data for 'post_history' model
INSERT INTO post_history (post_id, package_id, request_date, verified_date)
VALUES
  (3, 3, '2023-12-03', '2023-12-04'),
  (4, 4, '2023-12-04', '2023-12-05');

-- Additional dummy data for 'status' model
INSERT INTO status (package_id, post_id, received_date, transported_date, success, location)
VALUES
  (3, 3, '2023-12-04', '2023-12-05', true, 'Seattle Hub'),
  (4, 4, '2023-12-05', NULL, NULL, 'Denver Branch');

-- Additional dummy data for 'user' model
INSERT INTO user (uuid, email, full_name, password, post_id, role)
VALUES
  ('ghi789', 'alice.jones@example.com', 'Alice Jones', 'hashedpassword3', 3, 'BranchManager'),
  ('jkl012', 'mike.wilson@example.com', 'Mike Wilson', 'hashedpassword4', 4, 'TransactionStaff');
