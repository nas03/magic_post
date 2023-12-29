-- Dummy Customers
INSERT INTO Customer (name) VALUES
  ('John Doe'),
  ('Jane Smith'),
  ('Bob Johnson');

-- Dummy Locations
INSERT INTO Location (name, location, type) VALUES
  ('Branch A', 'City A', 'BRANCH'),
  ('Hub 1', 'City B', 'TRANSSHIPMENT_HUB'),
  ('Branch B', 'City C', 'BRANCH');

-- Dummy LocationStatistics
INSERT INTO LocationStatistics (sentCount, receivedCount, location_id) VALUES
  (10, 5, 1),
  (20, 10, 2),
  (15, 8, 3);

-- Dummy Users
INSERT INTO User (email, password, fullName, role, location_id) VALUES
  ('john.doe@example.com', 'password123', 'John Doe', 'LEADER', 1),
  ('jane.smith@example.com', 'password456', 'Jane Smith', 'BRANCH_OFFICER', 3),
  ('bob.johnson@example.com', 'password789', 'Bob Johnson', 'HUB_OFFICER', 2),
  ('sonanhnguyen003@gmail.com', '12345678', 'Nguyen Anh Son', 'BRANCH_CENTER_MANAGER', 3);

-- Dummy Packages
INSERT INTO Package (sender, receiver, transaction_point_id, location_id, state, shipment_id) VALUES
  ('Sender A', 'Receiver A', 1, 1, 'ONGOING', 1),
  ('Sender B', 'Receiver B', 2, 3, 'RECEIVED', 2),
  ('Sender C', 'Receiver C', 1, 2, 'RETURNED', 3);

-- Dummy TransshipmentLogs
INSERT INTO TransshipmentLog (request_timestamp, request_location, destination_location, location_id) VALUES
  ('2023-12-25', 1, 2, 1),
  ('2023-12-26', 3, 2, 3),
  ('2023-12-27', 2, 1, 2);

-- Dummy ShipmentLogs
INSERT INTO ShipmentLog (request_timestamp, status, request_location, location_id,package_id) VALUES
  ('2023-12-25', 'ONGOING', 1, 1, 1),
  ('2023-12-26', 'RECEIVED', 3, 2, 2),
  ('2023-12-27', 'RETURNED', 2, 3, 3);
