const Button = {
  baseStyle: {
    outline: 'none !important',
    borderRadius: '12px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#FFFFFF',
    _hover: {
      opacity: '80%',
    },
    _focus: {
      // border: '0px solid rgba(0, 0, 0, 0)',
      boxShadow: `0px 0px 0px 2px #FFFFFF`,
    },
  },
  sizes: {
    md: {
      padding: '16px 32px',
      height: '56px',
    },
    sm: {
      padding: '8px 16px',
      height: '44px',
      fontSize: '12px',
    },
  },
  variants: {
    primary: {
      background: '#C4FFF9',
      color: '#07BEB8',
    },
    outlined: {
      border: '1px solid #303030',
      color: '#303030',
      _hover: {
        opacity: '100%',
        background: '#F2F2F2',
      },
    },
    arrow: {
      background: '#FBD462',
      color: '#303030',
    },
    disabled: {
      background: 'grey.100',
      color: 'grey.700',
    },
    select: {
      fontSize: '14px',
      color: 'grey.500',
      border: '1px solid #D3D3D3',
      bg: 'white',
      borderRadius: '8px',
      px: '56px !important',
    },
    selected: {
      fontSize: '14px',
      color: 'grey.700',
      bg: 'yellow.500',
      border: '1px solid #FBD462',
      borderRadius: '8px',
      px: '56px !important',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};

export default Button;
