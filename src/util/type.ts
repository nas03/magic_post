
  
  interface Customer {
	id: number;
	name: string;
  }
  
  interface Location {
	id: number;
	name: string;
	location: string;
	type: LocationType;
	statistics?: LocationStatistics | null;
	transitionLog: TransitionLog[];
	employees: User[];
	packages: Package[];
	shipmentLog: ShipmentLog[];
  }
  
  interface LocationStatistics {
	id: number;
	sentCount: number;
	receivedCount: number;
	location_id: number;
	location: Location;
  }
  
  interface Package {
	id?: number;
	sender: string;
	receiver: string;
	sender_location: string;
	receiver_location: string;
	sender_phone: string;
	receiver_phone: string;
	type: PackageType;
	fee: number;
	received_location_id: number;
	destination_location_id: number;
	state?: PackageStatus;
	shipment_id?: number | null;
	received_location?: Location;
	shipment?: ShipmentLog | null;
  }
  
  interface TransitionLog {
	id?: number;
	request_timestamp?: Date;
	verified_timestamp?: Date | null;
	request_location: number;
	destination_location: number;
	location_id: number;
	package_id: number;
	location?: Location;
  }
  
  interface ShipmentLog {
	id?: number;
	request_timestamp?: Date;
	status: PackageStatus;
	location_id: number;
	package_id: number;
	location?: Location;
	package?: Package | null;
  }
  
  interface User {
	id: number;
	email: string;
	password: string;
	fullName: string;
	role: UserRole;
	location_id: number;
	location: Location;
  }
  
  enum LocationType {
	BRANCH = 'BRANCH',
	TRANSSHIPMENT_HUB = 'TRANSSHIPMENT_HUB',
  }
  
  enum PackageStatus {
	ONGOING = 'ONGOING',
	RECEIVED = 'RECEIVED',
	RETURNED = 'RETURNED',
  }
  
  enum UserRole {
	LEADER = 'LEADER',
	TRANSSHIPMENT_HUB_MANAGER = 'TRANSSHIPMENT_HUB_MANAGER',
	BRANCH_CENTER_MANAGER = 'BRANCH_CENTER_MANAGER',
	BRANCH_OFFICER = 'BRANCH_OFFICER',
	HUB_OFFICER = 'HUB_OFFICER',
	CUSTOMER = 'CUSTOMER',
  }
  
  enum CustomerInstruction {
	CANCEL = 'CANCEL',
	INSTANT_RETURN = 'INSTANT_RETURN',
	RETURN_BEFORE = 'RETURN_BEFORE',
	CALL = 'CALL',
	RETURN_AFTER_EXPIRED = 'RETURN_AFTER_EXPIRED',
  }
  
  enum PackageType {
	DOCUMENT = 'DOCUMENT',
	GOODS = 'GOODS',
  }
  
  export type {
	Customer,
	Location,
	LocationStatistics,
	Package,
	TransitionLog,
	ShipmentLog,
	User,
	LocationType,
	PackageStatus,
	UserRole,
	CustomerInstruction,
	PackageType,
  };
  