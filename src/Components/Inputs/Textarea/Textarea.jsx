import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function Textarea({id, label, placeHolder, value, onChange, onBlur}) {

    const {t} = useTranslation();

    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
        setHasValue(value && value.trim() !== '');
    }, [value]);

    const handleInputChange = (e) => {
        setHasValue(e.target.value.trim() !== '');
        if (onChange) onChange(e);
    };

    const handleBlur = (e) => {
        if (onBlur) onBlur(e);
    };

    return <React.Fragment>

        <div className={`relative w-full flex flex-col gap-1 group`}>

            <label 
                className={`
                    text-base font-medium 
                    ${hasValue ? 'text-[var(--blue-color)]' : 'text-[var(--gray-color-2)]'} 
                    duration-300 group-focus-within:text-[var(--blue-color)]
                `} 
                htmlFor={id}
            >{t(label)} :</label>

            <textarea 
                id={id} placeholder={t(placeHolder)}
                className={`
                    w-full h-24 p-2.5 rounded-md border border-solid resize-none
                    ${hasValue ? 'border-[var(--blue-color)]' : 'border-[var(--gray-color-2)]'} 
                    placeholder:text-[var(--gray-color)]
                    outline-0 duration-300 focus:border-[var(--blue-color)] text-base font-medium text-[var(--black-color)]
                `}
                autoComplete='off'
                value={value} onChange={handleInputChange} onBlur={handleBlur} 
            ></textarea>

        </div>

    </React.Fragment>


}
