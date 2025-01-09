// =========================================  custom styles for `react-select`  ==========================================
export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minWidth: 120,
    backgroundColor: 'rgb(28, 28, 30)',
    borderColor: state.isFocused ? '#00a753' : '#4b4b4b',
    boxShadow: state.isFocused ? '0 0 0 0.15vw #00a753' : '0 0 0 0.15vw transparent',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      borderColor: '#00a753',
      boxShadow: '0 0 0 0.15vw rgba(135, 207, 235, 0.186)',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#ffffff',
    transition: 'color 0.3s ease',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: 'rgb(28, 28, 30)',
    transition: 'opacity 0.3s ease',
    animation: 'slideDown 0.3s ease',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#00a753' : state.isFocused ? '#313131' : 'rgb(28, 28, 30)',
    color: '#ffffff',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: '#00a75496',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#ffffff',
    transition: 'color 0.3s ease',
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#00a753' : '#4b4b4b',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#00a753',
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: '#4b4b4b',
    transition: 'background-color 0.3s ease',
  }),
};

// ================================================================================================











