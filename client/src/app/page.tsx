import Form from "@/components/login-Page/Form";

export default function Home() {
 return (
  <div className="bg-image min-h-screen flex justify-center items-center w-full">
  <div className="card bg-base-100 rounded-lg w-[90%] md:w-2/3 lg:w-2/5">
    <div className="p-5">{/* login form */}
    <Form/>
    </div>
  </div>
</div>
 )
}
