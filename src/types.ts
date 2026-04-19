export interface Voter {
  serial_no: string;
  name: string;
  voter_no: string;
  father_name: string;
  mother_name: string;
  date_of_birth: string;
  address: string;
  occupation: string;
  gender: string;
  raw_text: string;
}

export interface SearchCriteria {
  name: string;
  father_name: string;
  mother_name: string;
  date_of_birth: string;
}
