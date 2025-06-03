import { IconCloud } from "../IconCloud";

interface TechIconCloudProps {
    technologies: string[];
}

export function TechIconCloud({ technologies }: TechIconCloudProps) {
    const images = technologies.map(
        (technology) => `https://cdn.simpleicons.org/${technology}/${technology}`
    );

    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden">
            <IconCloud images={images} />
        </div>
    );
}
