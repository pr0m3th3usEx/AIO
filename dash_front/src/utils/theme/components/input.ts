const Input = {
  baseStyle: {
    field: {
      default: {
        background: 'transparent',
      },
      _hover: {
        border: '3px solid #FFFFFF',
      },
      _focus: {
        border: `3px solid #FFFFFF !important`,
        boxShadow: `0px 0px 4px 0px rgba(180, 140, 49, 0.32)`,
        background: '#C4FFF9 !important',
        color: '#000',
      },
    },
  },
  sizes: {
    md: {
      field: {
        borderRadius: '12px',
        px: '24px',
        height: '64px',
        fontSize: '18px',
      },
    },
  },
  variants: {
    primary: {
      field: {
        border: '3px solid !important',
        borderRadius: '8px',
        background: 'transparent',
        _placeholder: {
          color: '#C4FFF9',
        },
      },
    },
    light: {
      field: {
        color: '#000',
        border: '3px solid #CCC !important',
        borderRadius: '8px',
        background: 'white',
        _placeholder: {
          color: '#CCCCCC',
        },
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};

export default Input;
