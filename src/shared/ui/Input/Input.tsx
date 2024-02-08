import { ChangeEvent, InputHTMLAttributes } from "react"
import styles from "./Input.module.scss"
import { classNames } from "../../lib/classNames/classNames"

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">

export enum InputType {
    TEXT = "text",
    NUMBER = "number",
    EMAIL = "email",
    PASSWORD = "password",
}

export interface InputProps extends HtmlInputProps {
    type?: InputType
    label?: string
    isRequired?: boolean
    className?: string
    error?: string
    value: string | number
    id?: string
    onChange: (value: string) => void
}

export function Input(props: InputProps) {
    const {
        type = "text",
        label,
        isRequired = false,
        className,
        error,
        value,
        id,
        onChange,
        ...otherProps
    } = props

    const containerClassName = classNames(styles.container, { [styles.incorrect]: error }, [
        className,
    ])

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        onChange?.(e.target.value)
    }

    return (
        <div className={containerClassName}>
            {!!label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                    {isRequired && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                id={id}
                onChange={changeHandler}
                value={value}
                type={type}
                className={styles.input}
                {...otherProps}
            />
            {!!error && <p className={styles.error}>{error}</p>}
        </div>
    )
}
