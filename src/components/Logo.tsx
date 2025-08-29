import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="PetSoft Logo" className="mx-auto md:mx-0" />
    </Link>
  );
}
