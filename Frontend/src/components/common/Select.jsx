export const Select = ({ options }) => {
  return (
    <select>
      {options.map((option) => {
        return (
          <option key={option.key} value={option.value}>
            {option.value}
          </option>
        );
      })}
    </select>
  );
};
