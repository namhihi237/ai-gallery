import { Dispatch, SetStateAction } from 'react';
import { KeyboardEvent } from 'react';

type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: Dispatch<SetStateAction<string>>;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
};

export function TextInput(props: InputProps): JSX.Element {
  return (
    <div>
      {props.label && <label>{props.label}:</label>}
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={props.onKeyDown}
        maxLength={props.maxLength}
        type="text"
        placeholder={props.placeholder}
        disabled={props.disabled}
        className="border-2 placeholder-gray-400 w-full rounded-md p-2 focus:outline-none focus:border-zinc-500 border-zinc-600 bg-black"
      />
    </div>
  );
}
