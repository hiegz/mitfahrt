"use client";

import {
    Ref,
    ReactNode,
    CSSProperties,
    useRef,
    useState,
    useImperativeHandle,
} from "react";

export type CheckboxHandle = {
    checked: boolean;
} & HTMLButtonElement;

type Props = {
    ref?: Ref<CheckboxHandle> | undefined;
    style?: CSSProperties | undefined;
    className?: string | undefined;
    disabled?: boolean | undefined;
    checked?: boolean | undefined;
    onChange?(checked: boolean): void;
    children?: ReactNode;
};

const Checkbox = (props: Props) => {
    const { ref, checked: shouldBeChecked, onChange, ...rest } = props;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isChecked, setIsChecked] = useState<boolean>(
        shouldBeChecked ?? false,
    );
    const checked = shouldBeChecked ?? isChecked;

    useImperativeHandle(ref, () => ({
        ...buttonRef.current!,
        checked,
    }));

    return (
        <button
            {...rest}
            ref={buttonRef}
            type="button"
            onClick={() => {
                setIsChecked(!checked);
                onChange?.(!checked);
            }}
            data-state={checked ? "checked" : "unchecked"}
        />
    );
};

export default Checkbox;
