import { FieldError, FieldValues, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

type inputProps = {
  id : string;
  type : string;
  labelText : string;
  error?: FieldError;
  register : UseFormRegisterReturn
}

function InputUI ({id,type,labelText,error,register} : inputProps) {
  return (
  <div className="grid gap-1 w-full">
    <label htmlFor={id} className="text-sm sm:text-base">{labelText} <span className="text-red-500 font-semibold">*</span> </label>
    <input
      type={type}
      id={id}
      {...register}
      className="w-full h-12 p-3 border rounded-md text-gray-800 shadow transition-all duration-300 focus:ring-2 focus:ring-purple-500 outline-none"
    />
    {error && <span className="text-red-500 font-semibold mt-2 pl-1">{error?.message}</span>}
  </div>
)};

export default InputUI;
