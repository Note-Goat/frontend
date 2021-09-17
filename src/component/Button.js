import {default as MUIButton } from '@material-ui/core/Button';

export default function Button({ title, onClick, icon, color }) {
  return (
    <MUIButton
      variant="contained"
      startIcon={icon}
      onClick={onClick}
      className="button"
      color={color}
    >
      {title}
    </MUIButton>
  );
}
