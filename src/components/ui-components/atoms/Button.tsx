import { ParentComponent, JSX } from "solid-js";

interface ButtonProps {
  type?: JSX.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: JSX.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  rounded?: boolean;
  disabled?: boolean;
}

export const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      class={
        "bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline " +
        (props.rounded ? "rounded-full" : "")
      }
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
