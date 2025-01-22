import Container from "@/components/Container";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] py-5 bg-slate-900 shadow-sm">
      <Container>
        <div className="inline-block">
            <Link href={'/'} className="text-4xl font-semibold tracking-tighter">SpaceExplore</Link>
        </div>
      </Container>
    </header>
  );
}
