type SectionTitleProps = {
    title: string;
};

export const SectionTitle = ({ title }: SectionTitleProps) => {
    return (
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
            {title}
        </h2>
    );
};