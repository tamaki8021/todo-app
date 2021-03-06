import React from 'react';
import TextField from '@material-ui/core/TextField'

export type TextProps = {
  fullWidth: boolean,
  label: string,
  multiline: boolean,
  required: boolean,
  rows: number,
  value: any,
  type: string,
  onChange: Function
}

const TextInput: React.FC<TextProps> = (props: any) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin={"dense"}
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

export default TextInput