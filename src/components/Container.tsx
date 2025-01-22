import { ReactNode } from "react"

interface ContainerProps {
    children: ReactNode;
    classes?: string;
}

export default function Container({ children, classes }: ContainerProps) {

    const baseClass = 'w-full max-w-[1320px] mx-auto px-5'

    return (
        <div className={`${baseClass} ${classes}`}>
            {children}
        </div>
    )
}