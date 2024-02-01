export default function Button({
  variant,
  value,
  handleClick,
  className,
}: {
  variant: string;
  value: string;
  handleClick: () => void;
  className?: string;
}) {
  variant = variant || "primary";
  let buttonClass = "";
  switch (variant) {
    case "primary":
      buttonClass =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ";
      break;
    case "secondary":
      buttonClass =
        "bg-green-700 text-white  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ";
      break;
    case "danger":
      buttonClass =
        "bg-red-700 text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ";
      break;
    default:
      buttonClass =
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  }
  buttonClass = buttonClass + " " + className;

  return (
    <button className={buttonClass} onClick={handleClick}>
      {value}
    </button>
  );
}
