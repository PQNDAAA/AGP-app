export interface InputFocused {
  name: string;
  touched: boolean;
}

export function inputFocusedDefaultSettings(): InputFocused[] {
  return [
    {
    name: "agent-name",
    touched: false,
  },
    {
      name: "domain-name",
      touched: false,
    },
    {
      name: "comment",
      touched: false,
    },
    {
      name: "professionalCardNumber",
      touched: false,
    }
    ]
}
