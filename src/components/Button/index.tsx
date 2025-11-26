import { HTMLAttributes } from "react";
import "./style.scss";

interface IButton extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
export const Button = ({ children, className = "", ...props }: IButton) => {
  return (
    <button
      type="button"
      className={`text-white bg-gray-800 hover:bg-gray-900 
      focus:outline-none focus:ring-4 focus:ring-gray-300 
      text-xs
      font-medium rounded-lg px-5 py-2.5 
       ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
