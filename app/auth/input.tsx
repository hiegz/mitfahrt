import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
    const { style, className, ...rest } = props;

    return (
        <div style={styl} className={className}>
            <input {...rest} />
        </div>
    );
};
