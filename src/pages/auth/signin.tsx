import { Button } from "@/components/Elements/ui/Button";
import { useRouter } from "next/router";

const Signin = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-800">
      <div className="mb-10 ">
        <h2 className="text-center text-2xl font-bold text-white">Bezzy!</h2>
        <span className="text-center text-sm font-light text-white"> Todo list App</span>
      </div>
      <div>
        <div>
          <div>
            <div>
              <Button onClick={() => {}}>Sign in with </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
