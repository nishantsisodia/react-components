import React, { useState } from "react";
import "./InputField.css";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  showClearButton = false,
  showPasswordToggle = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInputValue("");
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  const baseClasses = "input-field-container";
  const variantClasses = `input-${variant}`;
  const sizeClasses = `input-${size}`;
  const stateClasses = `
    ${disabled ? "input-disabled" : ""}
    ${invalid ? "input-invalid" : ""}
  `;

  return (
    <div className={`${baseClasses} ${sizeClasses} ${className}`}>
      {label && (
        <label className="input-label" htmlFor={label}>
          {label}
        </label>
      )}
      <div className="input-wrapper">
        <input
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={`${label}-helper ${label}-error`}
          className={`${variantClasses} ${sizeClasses} ${stateClasses} ${
            showClearButton && type === "password" && showPasswordToggle
              ? "has-two-buttons"
              : ""
          }`}
          id={label}
        />

        {showClearButton && inputValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear input"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {type === "password" && showPasswordToggle && (
          <button
            type="button"
            onClick={togglePassword}
            className="password-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C2 8 4.5 3 8 3C11.5 3 14 8 14 8C14 8 11.5 13 8 13C4.5 13 2 8 2 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L14 14M8.5 8.5L14 14M8.5 8.5L2 2M8.5 8.5L11 6M8.5 8.5L6 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 8C2 8 4.5 3 8 3C11.5 3 14 8 14 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {helperText && !errorMessage && (
        <span className="helper-text" id={`${label}-helper`}>
          {helperText}
        </span>
      )}

      {errorMessage && (
        <span className="error-message" id={`${label}-error`}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputField;
