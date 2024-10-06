export default function ControlInput(props) {
  const { labelName, name, children, ...proxyProps } = props;
  return (
    <div className="control">
      <label htmlFor={name}>{labelName}</label>
      <input name={name} {...proxyProps} />
      {children}
    </div>
  );
}
