import { LoginForm } from "@src/components/login-form";

const page = () => {
  return (
    <div
      className=" flex justify-center items-center h-screen w-full
    ">
      <div className=" min-w-1/3">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
