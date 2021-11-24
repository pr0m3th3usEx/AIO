const Select = {
  baseStyle: {
    field: {
      default: {
        border: '3px solid #3DCCC7',
        borderRadius: '10px',
        background: 'white',
        iconColor: 'black',
      },
      _hover: {},
      _focus: {
        border: `3px solid #FFFFFF !important`,
        boxShadow: `0px 0px 4px 0px rgba(180, 140, 49, 0.32)`,
        color: '#000',
        background: 'white',
      },
    },
  },
  sizes: {
    md: {
      field: {
        borderRadius: '10px',
        px: '12px',
        fontSize: '18px',
      },
    },
  },
  variants: {
    primary: {
      background: 'white',
    },
  },
  defaultProps: {
    variant: 'primary',
    color: 'black',
  },
};
export default Select;
