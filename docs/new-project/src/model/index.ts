export type User = {
  email: string;
  id: string;
  isAdmin: boolean;
};

export function makeSampleUser(): User {
  return {
    email: "john@example.com",
    id: "id123",
    isAdmin: true,
  };
}
