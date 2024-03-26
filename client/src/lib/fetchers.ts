import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const login = async (
  e: any,
  router: AppRouterInstance
  // socket : any
) => {
  e.preventDefault();
  try {
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: e.target[0].value,
        password: e.target[1].value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if(data.success){
      await localStorage.setItem("token", data.token);
      router.push("/fz");
    }

  } catch (error) {
    console.log(error);
  }
};

export async function fetchUser(
  cookie: { user?: any },
  setUser: { (user: any): void; (arg0: any): void }
) {
  const accessToken = cookie.user;
  const response = await fetch("/user", {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
    },
  });
  const user = await response.json();
  setUser(user);
}



export async function fetchMessages({ setData }: any) {
  try {
    const token =  await localStorage.getItem("token");
    const res = await fetch("/message",{
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
