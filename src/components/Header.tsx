import FroovaLogo from "@/components/FroovaLogo"; 

export default function Header() {
  return (
    <header className="py-4 flex -mb-28 justify-center">
      <FroovaLogo className="z-10 h-28 cursor-pointer text-sky-800" />
    </header>
  );
}
