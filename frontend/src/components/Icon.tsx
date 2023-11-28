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

const iconComponents: { [key: string]: React.ElementType } = {
	HomeIcon: HeroIcons24.HomeIcon,
};

export default function Icon(props: IconProp) {
  const { iconName, size = "small"} = props;
  const sizeStyle = sizes[size as keyof typeof sizes] || sizes['small'];
	const Icon = iconName ? iconComponents[iconName] : iconComponents['HomeIcon'];
	return Icon && <Icon className={`block ${sizeStyle}`} aria-hidden="true" />;
}
