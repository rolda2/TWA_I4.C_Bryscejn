export interface User {
    userId: string;
    username: string;
    password: string;
    number: string;
  }
  
  const dummyDatabase: { [userId: string]: User } = {
    '1': {
      userId: '1',
      username: 'alice',
      password: 'password123',
      number: '5555-1234-5555-1234',
    },
    '2': {
      userId: '2',
      username: 'bob',
      password: 'securepass',
      number: '5555-5678-5555-5678',
    },
  };
  
export default dummyDatabase;
  