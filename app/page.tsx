import { signIn } from "@/auth";
import Homes from "@/app/(front-end)/page";
import Google from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";


export default async function Home() {

    return(
        <>
            <IconButton className={`absolute! top-0 right-0`} onClick={ async () => { "use server"; await signIn("google", { redirectTo: "/admin", }); } }>
                <Google fontSize={"large"} className={`text-[#EDE8E4]!`} />
            </IconButton>
            <Homes />
        </>
    );
}