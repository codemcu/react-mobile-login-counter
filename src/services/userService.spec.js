import { saveUser, updateUser, getUser } from "./userService";

let mock;

beforeEach(() => {
  mock = [
    {
      email: "eve.holt@reqres.in",
      password: "123",
      timestamp: 1604920905975,
      id: 1,
    },
  ];

  global.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mock),
    });
  });
});

beforeEach(() => {
  fetch.mockClear();
});

describe("getUser", () => {
  test("should return 1 user", async () => {
    const email = "eve.holt@reqres.in";
    const password = "123";

    await expect(getUser(email, password)).resolves.toEqual(mock);
  });

  test("should return empty array", async () => {
    const email = "notfound@email.com";
    const password = "123";

    await expect(getUser(email, password)).resolves.toEqual([]);
  });
});

describe("saveUser", () => {
  test("should save 1 user", async () => {
    const email = "javier.roura@grifols.com";
    const password = "123";

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              email: "eve.holt@reqres.in",
              password: "123",
              timestamp: 1604920905975,
              id: 1,
            },
            {
              email: "javier.roura@grifols.com",
              password: "123",
              timestamp: 1604656165141,
              id: 2,
            },
          ]),
      });
    });

    const data = await saveUser(email, password);
    expect(data).toHaveLength(2);
  });
});

describe("updateUser", () => {
  test("should update user timestamp", async () => {
    const email = "javier.roura@grifols.com";
    const password = "123";
    const now = new Date().getTime();

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              email: "eve.holt@reqres.in",
              password: "123",
              timestamp: 1604920905975,
              id: 1,
            },
            {
              email: "javier.roura@grifols.com",
              password: "123",
              timestamp: now,
              id: 2,
            },
          ]),
      });
    });

    const data = await updateUser(email, password);
    expect(data[1].timestamp).toEqual(now);
  });
});
