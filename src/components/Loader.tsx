import Container from "./Container";

export default function Loader({ label }: { label: string; }) {
    return (
        <section className="min-h-dvh flex flex-wrap justify-center items-center">
            <Container classes="py-32">
                <h1 className="text-6xl text-center">{label}</h1>
            </Container>
        </section>
    )
}