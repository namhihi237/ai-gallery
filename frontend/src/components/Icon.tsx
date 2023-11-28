import React from 'react';
import * as HeroIcons24 from '@heroicons/react/24/outline';

export type IconProp = {
	readonly iconName?: string;
	readonly size?: string;
};

const sizes = {
  small : "h-6 w-6",
  large : "h-8 w-8",
}

const generateIconComponents = <T extends Record<string, React.ElementType>>(icons: T) => {
	const iconComponents: { [key in keyof T]: React.ElementType } = {} as any;

	Object.keys(icons).forEach((key) => {
		iconComponents[key as keyof T] = icons[key as keyof T];
	});

	return iconComponents;
};

const iconComponents = generateIconComponents(HeroIcons24);


export default function Icon(props: IconProp): JSX.Element {
  const { iconName, size = "small"} = props;
  const sizeStyle = sizes[size as keyof typeof sizes] || sizes['small'];
	const Icon = iconName ? iconComponents[iconName as keyof typeof iconComponents] : iconComponents['HomeIcon'];

	return Icon && <Icon className={`block ${sizeStyle}`} aria-hidden="true" />;
}
