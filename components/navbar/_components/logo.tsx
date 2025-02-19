import Link from "next/link";

const Logo = () =>{
    return (
        <>
        <Link href={'/'}>
        <span className="ml-3 mr-2 text-xl font-bold">
            Shawar<span className="text-red-600">ma</span>
        </span>
        </Link>
        </>
    );
};
export default Logo;