export default function PaymentOption({ id, value, label, name = "paymentMethod", checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center space-x-2 p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
    >
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        checked={checked}
        onChange={onChange}
        className="border-white/40 accent-white"
      />
      <span className="text-white flex-1">{label}</span>
    </label>
  );
}
