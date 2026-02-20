import Image from 'next/image';

type ResponsiveImageProps = { src: string; alt: string; priority?: boolean; className?: string; fill?: boolean; };

export const ResponsiveImage = ({ src, alt, priority = true, className, fill = true }: ResponsiveImageProps) => (
	<Image className={className} fill={fill} src={src} alt={alt} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={priority} />
);