import classNames from 'classnames';

export type ToastProps = {
  type?: ToastEnum;
  message: string;
};

export enum ToastEnum {
  success = 'alert-success',
  info = 'alert-info',
  error = 'alert-error',
}

export function Toast(props: ToastProps): JSX.Element {
  const { type = ToastEnum.success } = props;

  return (
    <div className="toast toast-top toast-center">
      <div className={classNames('alert', type)}>
        <span>{props.message}</span>
      </div>
    </div>
  );
}
