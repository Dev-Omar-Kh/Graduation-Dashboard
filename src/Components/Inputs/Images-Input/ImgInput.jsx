import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'

export default function ImgInput({label, onChange, onBlur, value}) {

    const {t} = useTranslation();

    const [fileValue, setFileValue] = useState(null);

    useEffect(() => {
        if (value) {
            setFileValue(value);
        }
    }, [value]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileValue(file);
        }
        if (onChange) {
            onChange(event);
        }
    };

    return <React.Fragment>

        <label 
            htmlFor="img" 
            className={`
                w-full p-2.5 bg-[var(--white-color)] rounded-md border-2 border-dashed
                flex items-center justify-center duration-300 cursor-pointer
                ${fileValue ? 'border-[var(--blue-color)]' : 'border-[var(--gray-color-2)]'}
            `}
        >

            <div 
                className={`
                    w-full flex items-center justify-center gap-2.5
                    duration-300
                    ${fileValue ? 'text-[var(--blue-color)]' : 'text-[var(--gray-color-2)]'}
                `}
            >
                <MdOutlineAddPhotoAlternate className='text-2xl'/>
                <p className='text-lg font-medium'>{t(label)}</p>
            </div>

            <input 
                type="file" id="img" className='hidden' 
                onChange={handleFileChange} onBlur={onBlur}
            />

        </label>

    </React.Fragment>

}
