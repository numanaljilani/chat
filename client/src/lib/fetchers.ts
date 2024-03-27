import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import server from "../constant"

export const login = async (
  e: any,
  router: AppRouterInstance,
  toast : any,
  Slide : any
) => {
  e.preventDefault();
  try {
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    const res = await fetch(`${server.server}/login`, {
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
    console.log(data)
    if(data.success){
      await localStorage.setItem("token", data.token);
      toast.success('🦄 ', {
        position: "السلام عليكم",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
      router.push("/fz");
    }else{
      toast.error(data.error || `something went wrong`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
    }

  } catch (error:any) {
    console.log(error);
    toast.error(error?.message || `something went wrong`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
      });
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
    const res = await fetch(`${server.server}/message`,{
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
