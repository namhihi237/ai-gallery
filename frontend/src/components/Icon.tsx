import loadable from '@loadable/component';
import { IconBaseProps, IconType } from 'react-icons/lib';

interface typesPropsIcon {
  iconName: string;
  propsIcon?: IconBaseProps;
  className?: string;
  color?: string;
}

// refer: https://github.com/react-icons/react-icons/issues/594#issuecomment-1236237124
export function Icon({
  iconName,
  propsIcon = { size: 24 },
  className,
  color,
}: typesPropsIcon): JSX.Element {
  const lib = iconName
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')[0]
    .toLocaleLowerCase();

  const ElementIcon: IconType = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: (el: JSX.Element) => el[iconName as keyof JSX.Element],
  }) as IconType;

  return <ElementIcon color={color} className={className} {...propsIcon} />;
}
