import { ComponentProps, FC } from 'react';
import ReactSelect from 'react-select';

export type SelectProps = ComponentProps<typeof ReactSelect> & {
  getOptionLabel?(value: any): string;
};

const Select: FC<SelectProps> = ({
  labelAttribute = 'Name',
  valueAttribute = 'ID',
  isClearable = true,
  getOptionLabel,
  ...props
}) => {
  return (
    <ReactSelect
      styles={{
        menu: provided => ({ ...provided, zIndex: 9999 }),
        control: (controlProps: any) => {
          return {
            ...controlProps,
            minHeight: '50px',
            minWidth: '160px',
          };
        },
      }}
      isClearable={isClearable}
      getOptionLabel={getOptionLabel || ((value: any) => value[labelAttribute])}
      getOptionValue={(value: any) => value[valueAttribute]}
      {...props}
    />
  );
};

export default Select;
